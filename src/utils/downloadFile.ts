export function clickDownloadFile(data: any, title: string) {
  const file = base64ToFile(data, title);
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement('a');
  link.href = url;
  const filename = title + '.docx';
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
}

export const base64ToFile = (base64Data: any, title: string) => {
  const baseString = base64Data.data
    .replace(
      'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;',
      ''
    )
    .replace('base64,', '')
    .trim();
  const filename = title + '.docx';
  const byteCharacters = atob(baseString);
  const byteArrays = [];
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }
  const byteArray = new Uint8Array(byteArrays);
  return new File([byteArray], filename, {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
};
