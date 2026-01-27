import React from "react";
import { useTranslation } from "react-i18next";
import { BookOpen, Download, Languages, Trash2, UploadCloud } from "lucide-react";

const StoryCard = ({
  story,
  onOpenFlipbook,
  onViewStory,
  onDownloadPDF,
  onDelete,
  onTranslate,
}) => {
  const { t } = useTranslation();


  const handleUploadToGoogleBooks = () => {
    // Gera PDF
    if (onDownloadPDF) {
      onDownloadPDF(story);
    }
    // Redireciona para o Google Books Upload
    window.open("https://play.google.com/books/publish", "_blank");
  };

  return (
    <div className="bg-white dark:bg-[#1a1a2e] p-5 rounded-xl shadow-md dark:shadow-lg flex flex-col justify-between border border-gray-200 dark:border-blue-500/20 hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] dark:hover:border-blue-500/50 transition-all duration-300 dark:backdrop-blur-sm">
      <h2 className="font-semibold text-lg text-gray-800 dark:text-white mb-2 line-clamp-1">
        {story.title || "Untitled"}
      </h2>

      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-4 leading-relaxed font-normal dark:font-light">{story.text}</p>

      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
        {/* Primary Action: Read */}
        <button
          onClick={() => onViewStory && onViewStory(story)}
          className="flex-1 px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-all"
          title={t('my_stories.buttons.view')}
        >
          {t('my_stories.buttons.view')}
        </button>

        {/* Secondary Actions: Icons */}
        <div className="flex gap-1">
          <button
            onClick={() => onOpenFlipbook(story)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
            title={t('my_stories.buttons.flipbook')}
          >
            <BookOpen size={18} />
          </button>

          <button
            onClick={() => onDownloadPDF(story)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
            title={t('my_stories.buttons.pdf')}
          >
            <Download size={18} />
          </button>

          <button
            onClick={() => onTranslate && onTranslate(story)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
            title={t('my_stories.buttons.translate')}
          >
            <Languages size={18} />
          </button>

          <button
            onClick={handleUploadToGoogleBooks}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
            title={t('my_stories.buttons.google_books')}
          >
            <UploadCloud size={18} />
          </button>

          <button
            onClick={() => onDelete(story.id)}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title={t('my_stories.buttons.delete')}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-3 text-right">
        {story.createdAt}
      </p>
    </div>
  );
};

export default StoryCard;
