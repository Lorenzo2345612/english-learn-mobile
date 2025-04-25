import { ReviewResponse } from "@/src/common/models/review.response.model";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { WrittingService } from "../services/writting.service";
import { WrittingReviewModel } from "../models/writting.review.model";
import { useHintContext } from "../contexts/hints.context";

export const useGetWrittingTestViewModel = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["writting-test"],
    queryFn: WrittingService.instance.getWrittingTest,
  });

  const { setHints, resetContext } = useHintContext();

  const retry = () => {
    refetch();
  };

  // Set hints when data is fetched
  useEffect(() => {
    if (data) {
      resetContext(); // Reset hints context before setting new hints
      setHints(data.hints);
    }
  }, [data, setHints]);

  return {
    data,
    error,
    isLoading,
    retry,
  };
};

export const useManageWrittingTestViewModel = () => {
  const [answer, setAnswer] = useState("");

  return {
    answer,
    setAnswer,
  };
};

export const useReviewWrittingTestViewModel = () => {
  const [review, setReview] = useState<ReviewResponse | null>(null);

  const mutation = useMutation({
    mutationFn: WrittingService.instance.submitTest,
    onSuccess: (data) => {
      setReview(data);
    },
    onError: (error) => {
      console.error("Failed to submit review", error);
    },
  });

  const handleSubmit = (review: WrittingReviewModel) => {
    mutation.mutate(review);
  };

  const cleanReview = () => {
    setReview(null);
  };

  return {
    review,
    handleSubmit,
    isPending: mutation.isPending,
    cleanReview,
    error: mutation.isError,
  };
};
