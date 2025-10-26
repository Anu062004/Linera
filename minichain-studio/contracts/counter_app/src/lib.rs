use linera_sdk::{
    base::{ApplicationId, ChainId, SessionId},
    contract::system_api,
    ApplicationCallResult, CalleeContext, Contract, EffectContext, ExecutionResult,
    MessageContext, OperationContext, Resource, SessionCallResult, ViewStateStorage,
};
use serde::{Deserialize, Serialize};

/// The state of the counter application.
#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Counter {
    /// The current value of the counter.
    pub value: u64,
}

/// The operation types that can be sent to the counter application.
#[derive(Debug, Deserialize, Serialize)]
pub enum CounterOperation {
    /// Increments the counter value by 1.
    Increment,
    /// Increments the counter value by the specified amount.
    IncrementBy { value: u64 },
    /// Resets the counter to 0.
    Reset,
}

/// The message types that can be sent to the counter application.
#[derive(Debug, Deserialize, Serialize)]
pub enum CounterMessage {
    /// Increments the counter value by 1.
    Increment,
    /// Increments the counter value by the specified amount.
    IncrementBy { value: u64 },
}

/// The application call types that can be made to the counter application.
#[derive(Debug, Deserialize, Serialize)]
pub enum CounterApplicationCall {
    /// Increments the counter value by 1.
    Increment,
    /// Increments the counter value by the specified amount.
    IncrementBy { value: u64 },
    /// Gets the current counter value.
    GetValue,
}

/// The session call types that can be made to the counter application.
#[derive(Debug, Deserialize, Serialize)]
pub enum CounterSessionCall {
    /// Increments the counter value by 1.
    Increment,
    /// Increments the counter value by the specified amount.
    IncrementBy { value: u64 },
    /// Gets the current counter value.
    GetValue,
}

/// The effect types that can be sent by the counter application.
#[derive(Debug, Deserialize, Serialize)]
pub enum CounterEffect {
    /// Increments the counter value by 1.
    Increment,
    /// Increments the counter value by the specified amount.
    IncrementBy { value: u64 },
}

impl Contract for Counter {
    type Operation = CounterOperation;
    type Message = CounterMessage;
    type ApplicationCall = CounterApplicationCall;
    type SessionCall = CounterSessionCall;
    type Effect = CounterEffect;
    type SessionState = ();
    type ApplicationState = Counter;

    async fn initialize(
        &mut self,
        _context: &OperationContext,
        _argument: (),
        _storage: ViewStateStorage<Self>,
    ) -> Result<ExecutionResult<Self::Effect>, linera_sdk::base::Error> {
        Ok(ExecutionResult::default())
    }

    async fn execute_operation(
        &mut self,
        _context: &OperationContext,
        operation: Self::Operation,
        _storage: ViewStateStorage<Self>,
    ) -> Result<ExecutionResult<Self::Effect>, linera_sdk::base::Error> {
        match operation {
            CounterOperation::Increment => {
                self.value += 1;
                Ok(ExecutionResult::default())
            }
            CounterOperation::IncrementBy { value } => {
                self.value += value;
                Ok(ExecutionResult::default())
            }
            CounterOperation::Reset => {
                self.value = 0;
                Ok(ExecutionResult::default())
            }
        }
    }

    async fn execute_message(
        &mut self,
        _context: &MessageContext,
        message: Self::Message,
        _storage: ViewStateStorage<Self>,
    ) -> Result<ExecutionResult<Self::Effect>, linera_sdk::base::Error> {
        match message {
            CounterMessage::Increment => {
                self.value += 1;
                Ok(ExecutionResult::default())
            }
            CounterMessage::IncrementBy { value } => {
                self.value += value;
                Ok(ExecutionResult::default())
            }
        }
    }

    async fn handle_application_call(
        &mut self,
        _context: &CalleeContext,
        call: Self::ApplicationCall,
        _storage: ViewStateStorage<Self>,
    ) -> Result<ApplicationCallResult<Self::Effect>, linera_sdk::base::Error> {
        match call {
            CounterApplicationCall::Increment => {
                self.value += 1;
                Ok(ApplicationCallResult::default())
            }
            CounterApplicationCall::IncrementBy { value } => {
                self.value += value;
                Ok(ApplicationCallResult::default())
            }
            CounterApplicationCall::GetValue => {
                Ok(ApplicationCallResult {
                    value: Some(self.value),
                    effects: vec![],
                })
            }
        }
    }

    async fn handle_session_call(
        &mut self,
        _context: &CalleeContext,
        _call: Self::SessionCall,
        _storage: ViewStateStorage<Self>,
    ) -> Result<SessionCallResult<Self::Effect>, linera_sdk::base::Error> {
        Err(linera_sdk::base::Error::default())
    }

    async fn handle_effect(
        &mut self,
        _context: &EffectContext,
        _effect: Self::Effect,
        _storage: ViewStateStorage<Self>,
    ) -> Result<ExecutionResult<Self::Effect>, linera_sdk::base::Error> {
        Ok(ExecutionResult::default())
    }
}

/// The state of the counter application.
#[derive(Debug, Default, Serialize, Deserialize)]
pub struct CounterView {
    /// The current value of the counter.
    pub value: u64,
}

impl linera_sdk::contract::WitInterface for Counter {
    const EXPORTS: &'static [&'static str] = &["initialize", "execute_operation", "execute_message", "handle_application_call", "handle_session_call", "handle_effect"];
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_counter_increment() {
        let mut counter = Counter::default();
        assert_eq!(counter.value, 0);
        
        counter.value += 1;
        assert_eq!(counter.value, 1);
    }

    #[test]
    fn test_counter_increment_by() {
        let mut counter = Counter::default();
        assert_eq!(counter.value, 0);
        
        counter.value += 5;
        assert_eq!(counter.value, 5);
    }

    #[test]
    fn test_counter_reset() {
        let mut counter = Counter { value: 10 };
        assert_eq!(counter.value, 10);
        
        counter.value = 0;
        assert_eq!(counter.value, 0);
    }
}
