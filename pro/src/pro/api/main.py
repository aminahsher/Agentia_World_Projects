from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pro.crews.agentic_flow.agent_crew import AgentiaCrew

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeRequest(BaseModel):
    requirements: str

@app.post("/generate-code")
async def generate_code(request: CodeRequest):
    try:
        result = (
            AgentiaCrew()
            .crew()
            .kickoff(inputs={"requirements": request.requirements})
        )
        return {"code": result.raw}
    except Exception as e:
        return {"error": str(e)} 