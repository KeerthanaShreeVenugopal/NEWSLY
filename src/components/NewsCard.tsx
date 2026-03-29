import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { NewsArticle, categoryColors } from "@/data/newsData";
import { getTimeAgo } from "@/utils/timeAgo";

const NewsCard = ({ article, index }: { article: NewsArticle; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* <Link to={`/article/${article.id}`}> */}
      <Link to={`/news/${article.id}`}>
        <div className="group relative glass rounded-2xl p-5 sm:p-6 h-full transition-all duration-300 hover:border-gold/40 hover:shadow-[0_8px_32px_-8px_hsl(38_95%_58%_/_0.2)]">
          {/* Category badge */}
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[article.category]}`}>
            {article.category}
          </span>

          {/* Title */}
          <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold font-['Space_Grotesk'] leading-snug group-hover:text-gold transition-colors line-clamp-2 text-foreground">
            {article.title}
          </h3>

          {/* Summary */}
          <p className="mt-2 text-sm text-foreground/65 leading-relaxed line-clamp-3">
            {article.summary}
          </p>

          {/* Footer */}
          <div className="mt-4 sm:mt-5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-foreground/50">
              <Clock className="w-3.5 h-3.5" />
              {/* <span>{article.readTime}</span> */}
              <span className="text-xs text-muted-foreground">
                {getTimeAgo(article.date)}
              </span>
              <span className="mx-1">·</span>
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-gold opacity-0 group-hover:opacity-100 transition-opacity">
              Read <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Hover glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, hsl(var(--gold) / 0.06), transparent 70%)" }} />
        </div>
      </Link>
    </motion.div>
  );
};

export default NewsCard;
