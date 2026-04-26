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
    <div className="bg-surface p-5 rounded-xl shadow-md flex flex-col justify-between border border-muted/10 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
      <h2 className="font-semibold text-lg text-primary mb-2 line-clamp-1">
        {story.title || "Untitled"}
      </h2>

      <p className="text-secondary text-sm mb-4 line-clamp-4 leading-relaxed font-normal">{story.text}</p>

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
            className="p-2 text-secondary hover:bg-surface-light rounded-lg transition-colors hidden md:block"
            title={t('my_stories.buttons.flipbook')}
          >
            <BookOpen size={18} />
          </button>

          <button
            onClick={() => onDownloadPDF(story)}
            className="p-2 text-secondary hover:bg-surface-light rounded-lg transition-colors"
            title={t('my_stories.buttons.pdf')}
          >
            <Download size={18} />
          </button>

          <button
            onClick={() => onTranslate && onTranslate(story)}
            className="p-2 text-secondary hover:bg-surface-light rounded-lg transition-colors"
            title={t('my_stories.buttons.translate')}
          >
            <Languages size={18} />
          </button>

          <button
            onClick={handleUploadToGoogleBooks}
            className="p-2 text-secondary hover:bg-surface-light rounded-lg transition-colors"
            title={t('my_stories.buttons.google_books')}
          >
            <UploadCloud size={18} />
          </button>

          <button
            onClick={() => onDelete(story.id)}
            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
            title={t('my_stories.buttons.delete')}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <p className="text-[11px] text-muted mt-3 text-right">
        {new Date(story.createdAt).toLocaleString(undefined, {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })}
      </p>
    </div>
  );
};

export default StoryCard;
