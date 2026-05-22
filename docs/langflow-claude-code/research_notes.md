# Research Notes: Langflow with Claude Code

## Core source URLs reviewed

| Topic | Source |
| --- | --- |
| Langflow overview | https://docs.langflow.org/ |
| Langflow installation | https://docs.langflow.org/get-started-installation |
| Langflow custom components | https://docs.langflow.org/components-custom-components |
| Langflow API overview/examples | https://docs.langflow.org/api-reference-api-examples |
| Langflow API reference | https://docs.langflow.org/api |
| Langflow MCP server | https://docs.langflow.org/mcp-server |
| Langflow Anthropic bundle | https://docs.langflow.org/bundles-anthropic |
| Claude Code quickstart | https://code.claude.com/docs/en/quickstart |
| Claude Code common workflows | https://code.claude.com/docs/en/common-workflows |
| Claude Code best practices | https://code.claude.com/docs/en/best-practices |
| Claude Code MCP | https://code.claude.com/docs/en/mcp |

## Verified facts to use in the guide

Langflow is an open-source, Python-based, customizable framework for building AI applications. It provides a visual editor where users connect and configure component nodes to create flows. Langflow supports agents, MCP, multiple LLMs, vector stores, custom components, real-time Playground testing, and API-based serving of flows.

Langflow installation options include Desktop, Docker, Python package, and source installation. Desktop is recommended by Langflow for simplified dependency management and upgrades, but some features such as Shareable Playground and Voice Mode are not available in Desktop. Docker can run `docker run -p 7860:7860 langflowai/langflow:latest`. Python package installation requires Python 3.10–3.13 on macOS/Linux or 3.10–3.12 on Windows, uv, and enough infrastructure. The default local URL is `http://127.0.0.1:7860` or `http://localhost:7860`.

Langflow API: the default API base for local deployments is `http://localhost:7860/api`. In versions 1.5 and later, most endpoints require authentication with a Langflow API key in an `x-api-key` header or query parameter. Application developers usually use `/v1/run/{flow_id_or_name}`, `/v1/run/advanced/{flow_id}`, and `/v1/webhook/{flow_id_or_name}`. Common environment variables include `LANGFLOW_API_KEY`, `LANGFLOW_SERVER_URL`, and `FLOW_ID`.

Custom components in Langflow are Python classes that inherit from `Component`. A custom component uses class-level attributes such as `display_name`, `description`, `documentation`, `icon`, `priority`, and `name`, plus `inputs`, `outputs`, and methods. The method named in an output must exist. Custom components need category folders and `__init__.py` files. With Docker, custom components can be mounted and exposed through `LANGFLOW_COMPONENTS_PATH`.

Anthropic in Langflow: the Anthropic bundle includes a component that generates text using Anthropic Chat and Language models like Claude. It can output a `Message` or a `LanguageModel`. The `LanguageModel` output is useful when an Anthropic model should power another component such as an Agent or Smart Transform. Parameters include `max_tokens`, `model`, `anthropic_api_key`, `temperature`, `anthropic_api_url`, and `prefill`.

Langflow MCP server: Langflow can act as both an MCP server and MCP client. As an MCP server, a Langflow project exposes flows as tools for MCP clients. A flow requires a Chat Output component to be usable as an MCP tool. Langflow supports streamable HTTP transport and SSE fallback. The default path uses `/streamable`. Tool names and descriptions are important because MCP clients use them to choose the correct tool. Langflow provides JSON snippets for MCP clients, commonly using `uvx mcp-proxy --transport streamablehttp http://LANGFLOW_SERVER_ADDRESS/api/v1/mcp/project/PROJECT_ID/streamable`, optionally with `--headers x-api-key YOUR_API_KEY`.

Claude Code quickstart: Claude Code can be installed with the native install script on macOS/Linux/WSL: `curl -fsSL https://claude.ai/install.sh | bash`. Windows install options include PowerShell, CMD, and WinGet. Users log in by starting `claude` and can use `/login`. Claude Code runs in project directories, can answer project questions, propose and make code changes after approval, run Git operations conversationally, fix bugs, add features, write tests, refactor, and update documentation. Essential commands include `claude`, `claude "task"`, `claude -p "query"`, `claude -c`, `claude -r`, `/clear`, `/help`, and `exit` or Ctrl+D.

Claude Code best practices: provide a way to verify work; use an explore-plan-code-commit workflow for larger changes; provide specific context; use file references with `@`; write and maintain a concise `CLAUDE.md`; configure permissions; use CLI tools and MCP servers; course-correct early; manage context aggressively; use subagents for investigation; resume conversations; and avoid vague prompts for implementation work.

Claude Code common workflows: begin by asking for an overview, architecture patterns, data models, and file structure. Ask Claude to find relevant files, trace execution flow, reproduce bugs, suggest fixes, refactor in small increments, write tests matching the project’s style, update documentation, create PRs, work with images, reference files and directories using `@`, and use plan mode before broad edits.

Claude Code MCP: Claude Code connects to external tools through MCP. Users can add remote HTTP servers with `claude mcp add --transport http <name> <url>`, add SSE servers though SSE is deprecated, or add local stdio servers. MCP servers are managed with `claude mcp list`, `claude mcp get`, `claude mcp remove`, and `/mcp` inside Claude Code. When using MCP, users should trust servers before connecting them and beware prompt injection risk from servers that fetch external content.

## Practical synthesis for the guide

The best beginner framing is: Langflow is the visual lab and runtime for AI workflows; Claude Code is the coding partner that helps install, document, customize, test, automate, version, and integrate those workflows. The user should not try to make Claude Code replace Langflow’s visual builder. They should use Claude Code to prepare environment files, create custom components, generate API client code, review exported flow JSON, write tests, document flows, and connect Langflow to apps or MCP.

Recommended beginner journey:

1. Install prerequisites and run Langflow locally.
2. Install Claude Code and start it in a dedicated Langflow project folder.
3. Create a `CLAUDE.md` file with the Langflow commands, constraints, and safety rules.
4. Build a first flow visually in Langflow using Chat Input, Prompt, Anthropic/Claude or another LLM, and Chat Output.
5. Test the flow in Playground.
6. Use Langflow’s API pane/API docs to run the flow from Python or curl.
7. Ask Claude Code to create scripts, `.env.example`, README, and troubleshooting docs.
8. Export or version flow JSON and ask Claude Code to explain it, check naming, and identify hardcoded secrets.
9. Create a custom component with Claude Code when a visual component is missing.
10. Expose a clean flow as an MCP tool only after it has a Chat Output, clear tool name, clear description, and safe boundaries.

Key pitfalls to emphasize: do not paste real API keys into prompts or commits; do not expose vague MCP tool names; do not build one giant flow before testing pieces; do not skip environment variables; do not use Desktop if the needed feature is unsupported there; do not rely on Claude Code without tests or expected outputs; do not connect untrusted MCP servers; do not commit generated secrets, local DBs, logs, or exported credentials.

Potential visuals:

- Big-picture architecture: user uses Langflow UI, Claude Code terminal, Git repo, and app/API clients.
- Beginner learning path timeline.
- Flow anatomy diagram: Input → Prompt → Model → Output, then add retrieval/tools.
- Decision table: Desktop vs Docker vs Python install.
- Claude Code prompt ladder: explore → plan → implement → verify → commit.
- API call sequence diagram.
- Custom component folder tree.
- MCP tool exposure diagram.
- Pitfall checklist.

## Citation mapping

Use citations:

[1] Langflow overview: https://docs.langflow.org/
[2] Langflow install: https://docs.langflow.org/get-started-installation
[3] Langflow API examples: https://docs.langflow.org/api-reference-api-examples
[4] Langflow custom components: https://docs.langflow.org/components-custom-components
[5] Langflow MCP server: https://docs.langflow.org/mcp-server
[6] Langflow Anthropic bundle: https://docs.langflow.org/bundles-anthropic
[7] Claude Code quickstart: https://code.claude.com/docs/en/quickstart
[8] Claude Code common workflows: https://code.claude.com/docs/en/common-workflows
[9] Claude Code best practices: https://code.claude.com/docs/en/best-practices
[10] Claude Code MCP: https://code.claude.com/docs/en/mcp

## Notes on source limitations

The Claude Code `extend-claude-code` URL attempted during research returned a 404-style page, so do not cite it directly. Use the best-practices and MCP pages instead.

The Langflow API reference is very large. Use the API examples page for beginner-ready syntax and the API reference only for endpoint facts.

The final guide should distinguish "using Claude in Langflow as an LLM provider" from "using Claude Code as a coding agent beside Langflow." These are related but not the same.

