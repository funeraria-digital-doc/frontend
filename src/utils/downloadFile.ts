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

export function clickDownloadImages(data: any, title: string) {
  for (let i = 0; i < Object.keys(data.data).length; i++) {
    const image = data.data[Object.keys(data.data)[i]];
    const newTitle = title + '_' + i;
    const filename = newTitle + '.png';
    console.log('filename', filename)
    console.log('image', image)
    const file = base64ToImage(image, filename);
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
  }
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

export const base64ToImage = (base64: string, title: string) => {
  const byteCharacters = atob(base64);
  const byteArrays = [];
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }
  const byteArray = new Uint8Array(byteArrays);
  return new File([byteArray], title);
};
