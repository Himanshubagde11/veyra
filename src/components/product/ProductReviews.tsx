"use client";

import { useState } from "react";
import { Star, Loader2, CheckCircle } from "lucide-react";
import { addReview } from "@/app/actions/reviewActions";
import { useSession } from "next-auth/react";

interface Review {
  id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  isVerified: boolean;
  createdAt: Date;
  user: {
    name: string | null;
  };
}

interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
}

export function ProductReviews({ productId, reviews }: ProductReviewsProps) {
  const { data: session } = useSession();
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      setError("You must be logged in to leave a review.");
      return;
    }
    setLoading(true);
    setError(null);

    const result = await addReview(productId, rating, title, comment);
    
    if (result.success) {
      setSuccess(true);
      setTitle("");
      setComment("");
      setRating(5);
    } else {
      setError(result.error || "Something went wrong.");
    }
    setLoading(false);
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="mt-16 pt-16 border-t border-veyra-champagne">
      <h2 className="text-2xl font-serif text-veyra-aubergine mb-8">Customer Reviews</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="sticky top-32">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl font-medium text-veyra-aubergine">{averageRating.toFixed(1)}</div>
              <div>
                <div className="flex text-veyra-coral mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-4 h-4 ${star <= Math.round(averageRating) ? "fill-current" : "text-veyra-champagne"}`} />
                  ))}
                </div>
                <div className="text-sm text-veyra-aubergine/60">Based on {reviews.length} reviews</div>
              </div>
            </div>

            <div className="bg-veyra-porcelain-warm p-6 rounded-2xl border border-veyra-champagne mt-8">
              <h3 className="text-lg font-serif text-veyra-aubergine mb-4">Write a Review</h3>
              {success ? (
                <div className="text-green-700 bg-green-50 p-4 rounded-lg text-sm flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Thank you! Your review has been submitted.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-veyra-aubergine/70 mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`p-1 transition-colors ${star <= rating ? "text-veyra-coral" : "text-veyra-champagne hover:text-veyra-coral/50"}`}
                        >
                          <Star className={`w-6 h-6 ${star <= rating ? "fill-current" : ""}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-veyra-aubergine/70 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-veyra-champagne rounded-lg focus:outline-none focus:ring-2 focus:ring-veyra-coral text-sm"
                      placeholder="Summary of your experience"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-veyra-aubergine/70 mb-1">Review</label>
                    <textarea
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 bg-white border border-veyra-champagne rounded-lg focus:outline-none focus:ring-2 focus:ring-veyra-coral text-sm resize-none"
                      placeholder="What did you like or dislike?"
                    />
                  </div>
                  {error && <p className="text-sm text-veyra-coral">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading || !session}
                    className="w-full py-3 bg-veyra-aubergine text-white rounded-lg text-sm font-medium hover:bg-veyra-obsidian transition-colors disabled:opacity-50 flex justify-center items-center"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {session ? "Submit Review" : "Login to Review"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          {reviews.length === 0 ? (
            <p className="text-veyra-aubergine/60">No reviews yet. Be the first to review this product!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="p-6 bg-white border border-veyra-champagne rounded-2xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex text-veyra-coral mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`w-4 h-4 ${star <= review.rating ? "fill-current" : "text-veyra-champagne"}`} />
                      ))}
                    </div>
                    <h4 className="font-medium text-veyra-aubergine">{review.title}</h4>
                  </div>
                  <span className="text-sm text-veyra-aubergine/40">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-veyra-aubergine/80 mb-4 whitespace-pre-wrap">{review.comment}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-veyra-aubergine">{review.user.name || "Anonymous"}</span>
                  {review.isVerified && (
                    <span className="inline-flex items-center text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified Buyer
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
