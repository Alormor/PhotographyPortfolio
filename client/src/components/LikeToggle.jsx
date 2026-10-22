export default function LikeToggle({ isLiked, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isLiked ? "Unlike photo" : "Like photo"}
      className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer ${
        isLiked
          ? 'bg-red-500/30 text-red-500 scale-110'
          : 'bg-black/50 text-neutral-400 hover:text-text hover:scale-105'
      }`}
    >
      <i className={`text-lg ${isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}`}></i>
    </button>
  )
}
