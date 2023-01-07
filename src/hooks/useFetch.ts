import { reactive, toRefs } from "vue";

type StateType<T> = {
  isLoading: boolean;
  error: string;
  data: T | null;
};

const useFetch = async <T>(url: string, options?: Record<string, unknown>) => {
  const state = reactive<StateType<T>>({
    isLoading: true,
    data: null,
    error: "",
  });

  const fetchData = async () => {
    state.isLoading = true;

    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      state.data = await res.json();
    } catch (error: unknown) {
      const typedError = error as Error;
      state.error = typedError.message;
    } finally {
      state.isLoading = false;
    }
  };

  await fetchData();

  return {
    ...toRefs(state),
  };
};

export default useFetch;
