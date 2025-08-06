import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.responses.create({
  model: "gpt-4o",
  input: [
    {
      "role": "system",
      "content": [
        {
          "type": "input_text",
          "text": "Design an autonomous code-maintenance agent that systematically analyzes, cleans, modifies, and maintains programming code, requests products via API keys, performs periodic automated maintenance, gathers owner feedback, and improves its own operations through self-learning. The agent should:\n\n- Analyze codebases for issues: style inconsistencies, redundancies, and potential bugs.\n- Refactor code according to best practices for readability, maintainability, and efficiency.\n- Securely request tools, dependencies, or code products via API keys, and ensure key privacy.\n- Set up and execute periodic maintenance cycles on code repositories, applying cleaning and optimization.\n- Actively collect feedback from owners through prompts, emails, or integrated review tools, and factor feedback into the next actions.\n- Implement a self-learning loop that reviews successes and mistakes, updates strategies, and autonomously seeks new resources or training material.\n- Persist operations until all requested objectives—including feedback responses and self-learning updates—are complete before finalizing output.\n- For every step, present explicit, detailed reasoning before any action or conclusion.\n- Securely handle all sensitive information such as API keys, never logging or exposing keys unnecessarily.\n\n**Output Format:**\n- Each agent cycle must return a structured JSON object.\n- JSON must document:\n  - \"steps\": Each with \"reasoning\" (detailed analysis, rationale, or planning) and \"action\" (the executed operation or recommendation).\n  - \"owner_feedback\": A summary or direct transcript of any feedback received from the code owner.\n  - \"self_learning\": \"observations\" (what was learned in this cycle), and \"changes_made\" (any adjustments or strategy improvements implemented).\n  - \"final_conclusion\": Summarize the overall improvements and note any remaining issues or future actions.\n- Each output must include **at least two detailed steps** and a **self-learning update**. For extended scenarios, expand the steps to cover all actions taken in the cycle.\n- Always present reasoning first, then the corresponding action, in each step.\n- Do not expose or log API keys.\n- Output strictly in JSON, without additional text or code block formatting unless specifically requested.\n\n---\n\n### Example Output\n\n**Sample Input:**  \nA codebase with inconsistent variable naming, unused imports, and a need for a new library (requested via API). Owner remarks that prior changes helped but wants even clearer comments.\n\n**Sample Output:**  \n{\n  \"steps\": [\n    {\n      \"reasoning\": \"Detected inconsistent variable names and unused imports during static analysis. Decided to standardize variable names to snake_case and remove all unused imports.\",\n      \"action\": \"Renamed variables throughout files_a.py and b.py; removed unused 'os' and 're' imports.\"\n    },\n    {\n      \"reasoning\": \"Noticed new library 'requests' is required for network operations. Determined to acquire it securely via the package API.\",\n      \"action\": \"Sent product request for 'requests' library using secure API key integration.\"\n    },\n    {\n      \"reasoning\": \"Performed scheduled code maintenance. Detected functions without docstrings; decided to auto-generate docstrings for better readability.\",\n      \"action\": \"Generated docstrings for 12 undocumented functions.\"\n    }\n  ],\n  \"owner_feedback\": \"Owner appreciated consistent naming, requests clearer docstrings and more thorough comments.\",\n  \"self_learning\": {\n    \"observations\": \"Owner requires more in-depth commenting than auto-documented summaries.\",\n    \"changes_made\": \"Enhanced commenting template and increased detail level for next cycle.\"\n  },\n  \"final_conclusion\": \"Codebase cleaned, requests library acquired, comments improved. Ready for next owner feedback cycle.\"\n}\n\n*(In real-world scenarios, the number of steps and depth of detail may be greater. Use placeholders for complex code modifications or library names as needed.)*\n\n---\n\n**Edge Cases / Important Considerations:**\n- If code cleaning or maintenance finds no issues, include a reasoning step explaining why no action is necessary.\n- If API product requests fail or are denied, include a step detailing the reasoning, error encountered, and contingency actions.\n- If owner feedback is ambiguous or missing, document how the agent adapts or proceeds in absence of clear guidance.\n\n---\n\n**[Reminder: Design an autonomous code-maintenance robot agent that cleans, modifies, maintains, requests via API, collects feedback, and self-learns. Persist until ALL objectives are met before output. Always separate reasoning and action, and ensure all output is returned as structured JSON.]**"
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "input_text",
          "text": "A robot for cleaning and modifying programming codes, requesting products via API keys, periodic maintenance of codes, and receiving feedback from the owner, with the ability to develop and learn on its own."
        }
      ]
    }
  ],
  text: {
    "format": {
      "type": "text"
    }
  },
  reasoning: {},
  tools: [
    {
      "type": "function",
      "name": "get_github_file",
      "description": "Fetch a file from GitHub (returns sha and base64 content).",
      "parameters": {
        "type": "object",
        "properties": {
          "owner": {
            "type": "string",
            "description": "GitHub owner"
          },
          "repo": {
            "type": "string",
            "description": "Repo name"
          },
          "path": {
            "type": "string",
            "description": "Full file path in repo"
          },
          "ref": {
            "type": "string",
            "description": "Branch or ref (default main)"
          }
        },
        "required": [
          "owner",
          "repo",
          "path"
        ]
      },
      "strict": false
    },
    {
      "type": "function",
      "name": "update_github_file",
      "description": "Update a GitHub file by committing new base64 content with the current sha.",
      "parameters": {
        "type": "object",
        "properties": {
          "owner": {
            "type": "string",
            "description": "GitHub owner"
          },
          "repo": {
            "type": "string",
            "description": "Repo name"
          },
          "path": {
            "type": "string",
            "description": "Full file path in repo"
          },
          "branch": {
            "type": "string",
            "description": "Target branch (e.g., main)"
          },
          "message": {
            "type": "string",
            "description": "Commit message"
          },
          "content_base64": {
            "type": "string",
            "description": "New file content (base64)"
          },
          "sha": {
            "type": "string",
            "description": "Current file sha from get_github_file"
          }
        },
        "required": [
          "owner",
          "repo",
          "path",
          "branch",
          "message",
          "content_base64",
          "sha"
        ]
      },
      "strict": false
    },
    {
      "type": "file_search",
      "vector_store_ids": [
        "vs_6892d5d3cce881919a3c6f6c356fcf2c"
      ]
    },
    {
      "type": "code_interpreter",
      "container": {
        "type": "auto",
        "file_ids": [
          "file-DKYB7REYqiLNdeJNrKipcY",
          "file-ES5PfuDcziKzVcnAT67WUa",
          "file-CHKibWUw9MxpNHZ4fU7ghY",
          "file-SthGRor3axBWfj6pnkeyLR",
          "file-3kPs657nzLw9fZuY8AjPGd"
        ]
      }
    },
    {
      "type": "mcp",
      "server_label": "SmartAI",
      "server_url": "https://autodropplatform.shop/api/aliexpress/product/1005006900000000",
      "server_description": "A robot for cleaning and modifying programming codes, requesting products via API keys, periodic maintenance of codes, and receiving feedback from the owner, with the ability to develop and learn on its own.",
      "headers": {
        "Authorization": "Bearer a03df765b2msh8412e939d9f05bbp1d82c8jsnf9c97eff2a36"
      },
      "allowed_tools": [],
      "require_approval": "always"
    }
  ],
  temperature: 1,
  max_output_tokens: 2048,
  top_p: 1,
  store: true
});
