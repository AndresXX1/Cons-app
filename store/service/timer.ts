import { axiosInstance } from '../actions/auth';
import { apiUrls } from '../api';

export const registerViewTime = async ({ time, view }: { time: number; view: string }) => {
  try {
    await axiosInstance.post(apiUrls.registerViewTime(), {
      time,
      view,
    });
  } catch (e) {}
};
