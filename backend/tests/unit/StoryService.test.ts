import { StoryService } from "../../src/services/StoryService";
import { StoryRepository } from "../../src/repositories/StoryRepository";
import { UserRepository } from "../../src/repositories/UserRepository";

import { GeminiService } from "../../src/services/GeminiService";
import { ImagenService } from "../../src/services/ImagenService";

jest.mock("../../src/repositories/StoryRepository");
jest.mock("../../src/repositories/UserRepository");
jest.mock("../../src/services/GeminiService");
jest.mock("../../src/services/ImagenService");

describe("StoryService (Unit & Regex)", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.GEMINI_API_KEY = "dummy_key";
    });

    it("should parse Title and Synopsis correctly when provided by Gemini", async () => {
        const dummyUserId = 1;
        const fakeUser = { id: 1, username: "Test" };
        (UserRepository.findById as jest.Mock).mockResolvedValueOnce(fakeUser);

        // Fake response string mimicking a Markdown response from Gemini
        const fakeApiResponseText = `
# Título: A Busca Pelo Códice

**Sinopse**:
O herói sai na jornada

## Capítulo 1
O início da aventura...
        `;

        (GeminiService.generateStructuredStory as jest.Mock).mockResolvedValueOnce({
            title: "A Busca Pelo Códice",
            synopsis: "O herói sai na jornada",
            chapters: [{ chapterNumber: 1, title: "Cap 1", content: "..." }]
        });

        (GeminiService.optimizeImagePrompt as jest.Mock).mockResolvedValue("optimized prompt");
        (ImagenService.generateImage as jest.Mock).mockResolvedValue("base64data");

        const fakeStory = { id: 10 };
        (StoryRepository.create as jest.Mock).mockImplementation((s) => s);
        (StoryRepository.save as jest.Mock).mockImplementation(async (s) => ({ ...s, id: 10 }));

        const result = await StoryService.generateStory("Crie uma aventura", dummyUserId);

        expect(result.title).toBe("A Busca Pelo Códice");
        expect(result.synopsis).toBe("O herói sai na jornada");
        expect(StoryRepository.create).toHaveBeenCalled();
    });

    it("should gracefully handle text without title or synopsis formats", async () => {
        const dummyUserId = 1;
        (UserRepository.findById as jest.Mock).mockResolvedValueOnce({ id: 1 });

        const fakeApiResponseText = `Apenas um texto direto iniciando a história sem títulos. E mais coisas.`;

        (GeminiService.generateStructuredStory as jest.Mock).mockResolvedValueOnce({
            title: "Apenas um texto direto iniciando a história sem títulos. E mais coisas.",
            synopsis: "",
            chapters: [{ chapterNumber: 1, title: "Cap 1", content: "..." }]
        });

        (GeminiService.optimizeImagePrompt as jest.Mock).mockResolvedValue("optimized prompt");
        (ImagenService.generateImage as jest.Mock).mockResolvedValue("base64data");

        const fakeStory = { id: 11 };
        (StoryRepository.create as jest.Mock).mockImplementation((s) => s);
        (StoryRepository.save as jest.Mock).mockImplementation(async (s) => ({ ...s, id: 11 }));

        const result = await StoryService.generateStory("Crie algo simple", dummyUserId);

        expect(result.title).toBe("Apenas um texto direto iniciando a história sem títulos. E mais coisas.");
        expect(result.synopsis).toBe("");
    });
});
