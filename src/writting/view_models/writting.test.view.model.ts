import { ReviewResponse } from "@/src/common/models/review.response.model";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { WrittingService } from "../services/writting.service";
import { WrittingReviewModel } from "../models/writting.review.model";
import { useHintContext } from "../contexts/hints.context";

export const useGetWrittingTestViewModel = () => {
  const [level, setLevel] = useState(-1);
  const { setHints, resetContext } = useHintContext();

  const queryFn = async () => {
    try {
      const response = await WrittingService.instance.getWrittingTest(level);
      if (response) {
        setHints(response.hints);
      }
      return response;
    } catch (error) {
      console.error("Error fetching writting test:", error);
      throw error; // Rethrow the error to be handled by react-query
    }
  };

  const { data, error, isLoading, isPending, refetch } = useQuery({
    queryKey: ["writting-test"],
    queryFn: queryFn,
  });

  const retry = () => {
    refetch();
  };

  return {
    data,
    error,
    isLoading,
    retry,
    level,
    setLevel,
    isPendingRefetch: isPending,
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
