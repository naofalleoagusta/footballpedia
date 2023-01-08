import { ref, watch } from "vue";

export default function useTitle() {
  const title = ref("");

  const setDocumentTitle = () => {
    document.title = title.value;
  };

  watch(title, setDocumentTitle);

  return title;
}
