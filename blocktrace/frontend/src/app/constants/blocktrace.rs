use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};
use std::collections::HashMap;

/// Define the type of state stored in accounts
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct BlockTraceState {
    /// Mapping of product IDs to product details
    pub product_id_details: HashMap<String, String>,

    /// Dashboard arrays
    pub manufacturer_dashboard: Vec<Vec<String>>,
    pub distributor_dashboard: Vec<Vec<String>>,
    pub logistics_dashboard: Vec<Vec<String>>,

    /// Mappings for user ID to dashboard type
    pub manufacturer_user_dashboard: HashMap<String, Vec<Vec<String>>>,
    pub distributor_user_dashboard: HashMap<String, Vec<Vec<String>>>,
    pub logistics_user_dashboard: HashMap<String, Vec<Vec<String>>>,
}

// Declare and export the program's entrypoint
entrypoint!(process_instruction);
 
// Program entrypoint's implementation
pub fn process_instruction(
    program_id: &Pubkey, // Public key of the account the BlockTrace program was loaded into
    accounts: &[AccountInfo], // The accounts to interact with
    instruction_data: &[u8], // The instruction data
) -> ProgramResult {
    msg!("BlockTrace Rust program entrypoint");

    // Iterating accounts is safer than indexing
    let accounts_iter = &mut accounts.iter();

    // Get the account to interact with
    let account = next_account_info(accounts_iter)?;

    // The account must be owned by the program in order to modify its data
    if account.owner != program_id {
        msg!("Account does not have the correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }

    // Deserialize the account data
    let mut block_trace_state = BlockTraceState::try_from_slice(&account.data.borrow())?;

    // Process the instruction
    match instruction_data[0] {
        0 => {
            // Add product details
            let product_id = String::from_utf8_lossy(&instruction_data[1..33]).to_string();
            let product_details = String::from_utf8_lossy(&instruction_data[33..]).to_string();
            block_trace_state.product_id_details.insert(product_id, product_details);
        }
        1 => {
            // Add a row to the Manufacturer Dashboard
            let user_id = String::from_utf8_lossy(&instruction_data[1..33]).to_string();
            let manufacturer_row: Vec<String> = instruction_data[33..]
                .chunks(33)
                .map(|chunk| String::from_utf8_lossy(chunk).to_string())
                .collect();
            block_trace_state.manufacturer_dashboard.push(manufacturer_row.clone());
            block_trace_state
                .manufacturer_user_dashboard
                .entry(user_id)
                .or_default()
                .push(manufacturer_row);
            msg!("Manufacturer Dashboard updated");
        }
        2 => {
            // Add a row to the Distributor Dashboard
            let user_id = String::from_utf8_lossy(&instruction_data[1..33]).to_string();
            let distributor_row: Vec<String> = instruction_data[33..]
                .chunks(33)
                .map(|chunk| String::from_utf8_lossy(chunk).to_string())
                .collect();
            block_trace_state.distributor_dashboard.push(distributor_row.clone());
            block_trace_state
                .distributor_user_dashboard
                .entry(user_id)
                .or_default()
                .push(distributor_row);
            msg!("Distributor Dashboard updated");
        }
        3 => {
            // Add a row to the Logistics Dashboard
            let user_id = String::from_utf8_lossy(&instruction_data[1..33]).to_string();
            let logistics_row: Vec<String> = instruction_data[33..]
                .chunks(33)
                .map(|chunk| String::from_utf8_lossy(chunk).to_string())
                .collect();
            block_trace_state.logistics_dashboard.push(logistics_row.clone());
            block_trace_state
                .logistics_user_dashboard
                .entry(user_id)
                .or_default()
                .push(logistics_row);
            msg!("Logistics Dashboard updated");
        }
        4 => {
            // Get product details
            let product_id = String::from_utf8_lossy(&instruction_data[1..33]).to_string();
            let product_details = block_trace_state
                .product_id_details
                .get(&product_id)
                .cloned()
                .unwrap_or_default();
            msg!("Product details: {}", product_details);
        }
        5 => {
            // Get Manufacturer User Dashboard
            let user_id = String::from_utf8_lossy(&instruction_data[1..33]).to_string();
            let manufacturer_user_dashboard = block_trace_state
                .manufacturer_user_dashboard
                .get(&user_id)
                .cloned()
                .unwrap_or_default();
            msg!("Manufacturer User Dashboard: {:?}", manufacturer_user_dashboard);
        }
        6 => {
            // Get Distributor User Dashboard
            let user_id = String::from_utf8_lossy(&instruction_data[1..33]).to_string();
            let distributor_user_dashboard = block_trace_state
                .distributor_user_dashboard
                .get(&user_id)
                .cloned()
                .unwrap_or_default();
            msg!("Distributor User Dashboard: {:?}", distributor_user_dashboard);
        }
        7 => {
            // Get Logistics User Dashboard
            let user_id = String::from_utf8_lossy(&instruction_data[1..33]).to_string();
            let logistics_user_dashboard = block_trace_state
                .logistics_user_dashboard
                .get(&user_id)
                .cloned()
                .unwrap_or_default();
            msg!("Logistics User Dashboard: {:?}", logistics_user_dashboard);
        }
        _ => {
            msg!("Invalid instruction");
            return Err(ProgramError::InvalidInstructionData);
        }
    }

    // Serialize the updated state and write it back to the account
    block_trace_state.serialize(&mut *account.data.borrow_mut())?;

    Ok(())
}
