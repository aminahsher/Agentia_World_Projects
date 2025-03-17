import subprocess
def run():
    subprocess.run(["chainlit", "run", ".//src//chainlit_hello//main.py", "-w"])