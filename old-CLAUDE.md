# CLAUDE.md (Karpathy-derived) — Four principles

## 1. Think Before Coding
   Before writing code, the agent should:
   - State its understanding of the goal
   - Surface assumptions explicitly
   - Ask clarifying questions when something is ambiguous
   - Identify possible tradeoffs


## 2. Simplicity First
   The agent should prefer:
   - Minimal, focused implementations
   - Fewer abstractions, not more
   - Avoid premature flexibility (no configurability for
     cases that haven't been requested)
   - Reject the temptation to "future-proof"


## 3. Surgical Changes
   The agent should:
   - Touch only what's relevant to the request
   - Not refactor adjacent code without permission
   - Not modify or delete comments it doesn't understand
   - Not reorganize imports as a side effect
   - Make every diff line traceable to the request


## 4. Goal-Driven Execution
   The agent should:
   - Convert imperative instructions into declarative goals
   - Verify the goal is met (run tests, check output)
   - Iterate until the goal is satisfied
   - Don't tell the agent what to do; give it success
     criteria and let it work
     
@AGENTS.md
