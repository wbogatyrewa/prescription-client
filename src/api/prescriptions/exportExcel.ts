import { domain } from "../address";

async function exportExcel() {
  try {
    const fetchUrl: string = `${domain}/export-excel`;
    const response: Response = await fetch(fetchUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to export project:", response.statusText);
      return;
    }

    const blob = await response.blob(); // Преобразуем ответ в Blob
    const url = window.URL.createObjectURL(blob); // Создаем временный URL

    // Создаем ссылку для скачивания
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.xlsx`; // Указываем имя файла
    document.body.appendChild(link);
    link.click(); // Симулируем клик по ссылке
    link.remove(); // Удаляем ссылку после скачивания

    // Очищаем временный URL
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("Error exporting project:", error);
  }
}

export default exportExcel;
