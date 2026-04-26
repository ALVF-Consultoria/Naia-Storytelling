export function buildStoryPrompt(formData) {
  return `
Create a story divided into 5 chapters based on the following elements:

1. Protagonist:
- Name: ${formData.protagonistName}
- Description: ${formData.protagonistDescription}
- Goal: ${formData.protagonistGoal}

2. Antagonist & Conflict:
- Antagonist: ${formData.antagonistNature}
- Conflict starting point: ${formData.conflictStartingPoint}

3. Setting & Atmosphere:
- Location: ${formData.settingLocation}
- Time period: ${formData.settingTime}
- Tone/Atmosphere: ${formData.settingTone}

4. Plot & Climax:
- Greatest obstacle: ${formData.plotObstacle}
- Climax: ${formData.plotClimax}

5. Theme & Message:
- Central message/theme: ${formData.themeMessage}

6. Visual Style:
- Estilo: ${formData.visualStyle || 'Cinematográfico'}

Rules:
- WRITE THE STORY IN: ${formData.storyLanguage || 'Portuguese'}.
- Divide the story into 5 clear chapters.
- Each chapter should be between 100 and 200 words.
- Maintain the specified tone and atmosphere.
- Show the protagonist’s development throughout the narrative.
- Start each chapter with "Chapter X:" (or equivalent in the selected language).

🔹 Return the response **only** in the following valid JSON format:

{
  "title": "A creative title based on the story",
  "story": "Here goes the complete story in 5 chapters"
}

Do not include explanations or code, only the JSON.
`;
}
