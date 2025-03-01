import axios, { Axios, AxiosError } from "axios";
import { WrittingTestModel } from "../models/writting.test.model";
import { WrittingReviewModel } from "../models/writting.review.model";
import { ReviewResponse } from "@/src/common/models/review.response.model";
import { API_URL } from "@/src/common/constants/api";
import { USER_ID } from "@/src/common/constants/user";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export class WrittingService {
  public static _instance: WrittingService;
  private constructor() {
    // Private constructor to prevent instantiation
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public async getWrittingTest() {
    try {
      const { data, status } = await axios.get<WrittingTestModel>(
        `${API_URL}/writting/get-activity/${USER_ID}`
      );
      if (status !== 200) {
        throw new Error("Failed to fetch data");
      }
      return data;
    } catch (error: any) {
      console.error(error);
      throw new Error("Failed to fetch data");
    }
  }

  public async submitTest(review: WrittingReviewModel) {
    try {
      const mappedRequest = {
        verse_id: review.verseId,
        translation: review.translation,
      };
      const { status, data } = await axios.post<ReviewResponse>(
        `${API_URL}/writting/review-translate-answer/${USER_ID}`,
        mappedRequest
      );
      if (status !== 201) {
        throw new Error("Failed to submit review");
      }
      return data;
    } catch (error) {
      throw new Error("Failed to submit review");
    }
  }
}
