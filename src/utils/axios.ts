/* eslint-disable @typescript-eslint/no-unused-vars */
import { isEmpty } from 'lodash';

async function downloadFile(url: string, params?: Record<string, any>) {
  const queryString = params
    ? Object.keys(params)
        .filter(key => params[key])
        .map(
          key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
        )
        .join('&')
    : '';
  const newUrl = isEmpty(queryString) ? url : `${url}?${queryString}`;

  // @ts-ignore. TODO: include axsion lib.
  const response = await axios({
    url: newUrl,
    method: 'GET',
    responseType: 'blob' // important
  });

  const content = response.headers['content-disposition'];
  if (!content) {
    return;
  }

  const filename = content.split('filename=')[1].replace(/['"]+/g, '');
  const link = document.createElement('a');
  const href = URL.createObjectURL(response.data);

  link.href = href;
  link.setAttribute('download', filename); //or any other extension
  document.body.appendChild(link);
  link.click();

  // clean up "a" element & remove ObjectURL
  link.remove();
  URL.revokeObjectURL(href);
}
