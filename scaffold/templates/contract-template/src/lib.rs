use linera_sdk::macros::contract;
use linera_sdk::{ApplicationCallResult, Contract, ViewStateStorage};
use serde::{Deserialize, Serialize};

/// The state of the contract.
#[derive(Debug, Default, Serialize, Deserialize)]
pub struct State {
    pub counter: u64,
}

/// The contract implementation.
#[contract]
impl Contract for State {
    type ApplicationCall = ();
    type Message = ();
    type Parameters = ();
    type SessionCall = ();
    type SessionState = ();
    type ViewState = State;

    async fn initialize(
        &mut self,
        _context: &linera_sdk::context::ApplicationContext,
        _argument: (),
        _storage: &mut dyn linera_sdk::contract::ContractStorage,
    ) -> Result<(), linera_sdk::error::ExecutionError> {
        self.counter = 0;
        Ok(())
    }

    async fn execute_message(
        &mut self,
        _context: &linera_sdk::context::ApplicationContext,
        _message: (),
        _storage: &mut dyn linera_sdk::contract::ContractStorage,
    ) -> Result<(), linera_sdk::error::ExecutionError> {
        Ok(())
    }

    async fn handle_application_call(
        &mut self,
        _context: &linera_sdk::context::ApplicationContext,
        _call: (),
        _storage: &mut dyn linera_sdk::contract::ContractStorage,
    ) -> Result<ApplicationCallResult<()>, linera_sdk::error::ExecutionError> {
        Ok(ApplicationCallResult::default())
    }

    async fn handle_session_call(
        &mut self,
        _context: &linera_sdk::context::ApplicationContext,
        _session: linera_sdk::session::SessionId,
        _call: (),
        _forwarded_sessions: linera_sdk::collections::Vec<linera_sdk::session::SessionId>,
        _storage: &mut dyn linera_sdk::contract::ContractStorage,
    ) -> Result<linera_sdk::session::SessionCallResult<()>, linera_sdk::error::ExecutionError> {
        Err(linera_sdk::error::ExecutionError::default())
    }

    async fn store_view_state(
        &mut self,
        _context: &linera_sdk::context::ApplicationContext,
        _storage: &mut dyn linera_sdk::contract::ContractStorage,
    ) -> Result<(), linera_sdk::error::ExecutionError> {
        Ok(())
    }
}

/// Simple counter operations
impl State {
    /// Increment the counter
    pub fn increment(&mut self) {
        self.counter += 1;
    }

    /// Decrement the counter
    pub fn decrement(&mut self) {
        if self.counter > 0 {
            self.counter -= 1;
        }
    }

    /// Get the current counter value
    pub fn get_counter(&self) -> u64 {
        self.counter
    }

    /// Reset the counter
    pub fn reset(&mut self) {
        self.counter = 0;
    }
}
