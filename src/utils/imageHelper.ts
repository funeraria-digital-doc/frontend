export function base64ToFile(base64Data: string, username: any) {
  let filename = '';
  let byteCharacters = '';
  if (base64Data.includes('image/png')) {
    filename = username.value + '_picture.png';
    byteCharacters = atob(base64Data.replace('data:image/png;base64,', ''));
  } else {
    filename = username.value + '_picture.jpg';
    byteCharacters = atob(base64Data.replace('data:image/jpeg;base64,', ''));
  }
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i)); // Convert each character to its byte value
  }

  const byteArray = new Uint8Array(byteArrays); // Create a Uint8Array from the byte values
  return new File([byteArray], filename, { type: 'image/jpeg' }); // Create a File object from the Uint8Array
}

export function checkImageTypeAndSize(file: File) {
  const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
  let canUpload = true;
  let snackMessage = '';
  canUpload = false;
  if (
    file.type !== 'image/png' &&
    file.type !== 'image/jpeg' &&
    parseInt(sizeInMB) > 10
  ) {
    snackMessage =
      'A imagem tem de ser jpeg ou png. <br/> A imagem tem mais de 10mb de tamanho';
  } else if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
    snackMessage = 'A imagem tem de ser jpeg ou png.';
  } else if (parseInt(sizeInMB) > 10) {
    snackMessage = 'A imagem tem mais de 10mb.';
  } else {
    canUpload = true;
  }
  return { snackMessage: snackMessage, canUpload: canUpload };
}
