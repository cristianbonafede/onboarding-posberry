const mockup = process.env.NEXT_PUBLIC_MOCKUP === 'true';

const get = async () => {
  if (mockup) {
    return {
      logo: 'data:image/png;base64,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',
      color: '#ef4123',
    };
  }

  const id = sessionStorage.getItem('entidad');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/entidades/${id}`;

  const response = await http.get(url);
  if (!response.error) {
    return response.data;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

export const entidad = {
  get: get,
};
