const API_BASE = 'http://localhost:8080/api'; // change if your backend port is different

// ✅ 1. Fetch all modules from all Course documents
export async function fetchModules() {
  const res = await fetch(`${API_BASE}/quiz`);
  if (!res.ok) throw new Error('Failed to fetch modules');
  const courses = await res.json();

  // Flatten modules array from all course documents
  const modules = courses.flatMap(course => course.modules);

  return modules;
}

// ✅ 2. Get a single module's questions by module ID
export async function fetchQuestions(moduleId) {
  const res = await fetch(`${API_BASE}/quiz/module/${moduleId}`);
  if (!res.ok) throw new Error('Failed to fetch questions');
  return res.json(); // should return { title, quiz, description, etc }
}

export async function submitResult(result) {
  const res = await fetch(`${API_BASE}/results`, { // ✅ fixed: "results" not "result"
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result),
  });
  if (!res.ok) throw new Error('Failed to submit result');
  return res.json();
}

export async function getAIResponse(messages) {
  const res = await fetch(`${API_BASE}/chatbot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) throw new Error('Chatbot failed');
  return res.json(); // returns { choices: [{ message: { content: ... } }] }
}

