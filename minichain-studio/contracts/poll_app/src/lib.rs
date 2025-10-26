use linera_sdk::{
    base::{ApplicationId, ChainId, SessionId},
    contract::system_api,
    ApplicationCallResult, CalleeContext, Contract, EffectContext, ExecutionResult,
    MessageContext, OperationContext, Resource, SessionCallResult, ViewStateStorage,
};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

/// The state of the poll application.
#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Poll {
    /// The poll question.
    pub question: String,
    /// The poll options and their vote counts.
    pub options: HashMap<String, u64>,
    /// Total number of votes cast.
    pub total_votes: u64,
    /// Whether the poll is still active.
    pub is_active: bool,
}

/// The operation types that can be sent to the poll application.
#[derive(Debug, Deserialize, Serialize)]
pub enum PollOperation {
    /// Creates a new poll with the given question and options.
    CreatePoll { question: String, options: Vec<String> },
    /// Votes for a specific option.
    Vote { option: String },
    /// Closes the poll.
    ClosePoll,
    /// Reopens the poll.
    ReopenPoll,
}

/// The message types that can be sent to the poll application.
#[derive(Debug, Deserialize, Serialize)]
pub enum PollMessage {
    /// Votes for a specific option.
    Vote { option: String },
    /// Closes the poll.
    ClosePoll,
}

/// The application call types that can be made to the poll application.
#[derive(Debug, Deserialize, Serialize)]
pub enum PollApplicationCall {
    /// Creates a new poll with the given question and options.
    CreatePoll { question: String, options: Vec<String> },
    /// Votes for a specific option.
    Vote { option: String },
    /// Gets the current poll results.
    GetResults,
    /// Gets the poll question.
    GetQuestion,
    /// Checks if the poll is active.
    IsActive,
    /// Closes the poll.
    ClosePoll,
}

/// The session call types that can be made to the poll application.
#[derive(Debug, Deserialize, Serialize)]
pub enum PollSessionCall {
    /// Votes for a specific option.
    Vote { option: String },
    /// Gets the current poll results.
    GetResults,
}

/// The effect types that can be sent by the poll application.
#[derive(Debug, Deserialize, Serialize)]
pub enum PollEffect {
    /// Votes for a specific option.
    Vote { option: String },
    /// Closes the poll.
    ClosePoll,
}

impl Contract for Poll {
    type Operation = PollOperation;
    type Message = PollMessage;
    type ApplicationCall = PollApplicationCall;
    type SessionCall = PollSessionCall;
    type Effect = PollEffect;
    type SessionState = ();
    type ApplicationState = Poll;

    async fn initialize(
        &mut self,
        _context: &OperationContext,
        _argument: (),
        _storage: ViewStateStorage<Self>,
    ) -> Result<ExecutionResult<Self::Effect>, linera_sdk::base::Error> {
        // Initialize with default poll
        self.question = "What is your favorite option?".to_string();
        self.options.insert("Option A".to_string(), 0);
        self.options.insert("Option B".to_string(), 0);
        self.options.insert("Option C".to_string(), 0);
        self.total_votes = 0;
        self.is_active = true;
        
        Ok(ExecutionResult::default())
    }

    async fn execute_operation(
        &mut self,
        _context: &OperationContext,
        operation: Self::Operation,
        _storage: ViewStateStorage<Self>,
    ) -> Result<ExecutionResult<Self::Effect>, linera_sdk::base::Error> {
        match operation {
            PollOperation::CreatePoll { question, options } => {
                self.question = question;
                self.options.clear();
                for option in options {
                    self.options.insert(option, 0);
                }
                self.total_votes = 0;
                self.is_active = true;
                Ok(ExecutionResult::default())
            }
            PollOperation::Vote { option } => {
                if self.is_active && self.options.contains_key(&option) {
                    *self.options.get_mut(&option).unwrap() += 1;
                    self.total_votes += 1;
                }
                Ok(ExecutionResult::default())
            }
            PollOperation::ClosePoll => {
                self.is_active = false;
                Ok(ExecutionResult::default())
            }
            PollOperation::ReopenPoll => {
                self.is_active = true;
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
            PollMessage::Vote { option } => {
                if self.is_active && self.options.contains_key(&option) {
                    *self.options.get_mut(&option).unwrap() += 1;
                    self.total_votes += 1;
                }
                Ok(ExecutionResult::default())
            }
            PollMessage::ClosePoll => {
                self.is_active = false;
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
            PollApplicationCall::CreatePoll { question, options } => {
                self.question = question;
                self.options.clear();
                for option in options {
                    self.options.insert(option, 0);
                }
                self.total_votes = 0;
                self.is_active = true;
                Ok(ApplicationCallResult::default())
            }
            PollApplicationCall::Vote { option } => {
                if self.is_active && self.options.contains_key(&option) {
                    *self.options.get_mut(&option).unwrap() += 1;
                    self.total_votes += 1;
                }
                Ok(ApplicationCallResult::default())
            }
            PollApplicationCall::GetResults => {
                Ok(ApplicationCallResult {
                    value: Some(self.options.clone()),
                    effects: vec![],
                })
            }
            PollApplicationCall::GetQuestion => {
                Ok(ApplicationCallResult {
                    value: Some(self.question.clone()),
                    effects: vec![],
                })
            }
            PollApplicationCall::IsActive => {
                Ok(ApplicationCallResult {
                    value: Some(self.is_active),
                    effects: vec![],
                })
            }
            PollApplicationCall::ClosePoll => {
                self.is_active = false;
                Ok(ApplicationCallResult::default())
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

/// The state of the poll application.
#[derive(Debug, Default, Serialize, Deserialize)]
pub struct PollView {
    /// The poll question.
    pub question: String,
    /// The poll options and their vote counts.
    pub options: HashMap<String, u64>,
    /// Total number of votes cast.
    pub total_votes: u64,
    /// Whether the poll is still active.
    pub is_active: bool,
}

impl linera_sdk::contract::WitInterface for Poll {
    const EXPORTS: &'static [&'static str] = &["initialize", "execute_operation", "execute_message", "handle_application_call", "handle_session_call", "handle_effect"];
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_poll_creation() {
        let mut poll = Poll::default();
        poll.question = "Test question".to_string();
        poll.options.insert("Option 1".to_string(), 0);
        poll.options.insert("Option 2".to_string(), 0);
        poll.is_active = true;
        
        assert_eq!(poll.question, "Test question");
        assert_eq!(poll.options.len(), 2);
        assert!(poll.is_active);
    }

    #[test]
    fn test_poll_voting() {
        let mut poll = Poll::default();
        poll.options.insert("Option A".to_string(), 0);
        poll.options.insert("Option B".to_string(), 0);
        poll.is_active = true;
        
        // Vote for Option A
        *poll.options.get_mut("Option A").unwrap() += 1;
        poll.total_votes += 1;
        
        assert_eq!(poll.options["Option A"], 1);
        assert_eq!(poll.total_votes, 1);
    }

    #[test]
    fn test_poll_closing() {
        let mut poll = Poll::default();
        poll.is_active = true;
        
        poll.is_active = false;
        
        assert!(!poll.is_active);
    }
}
