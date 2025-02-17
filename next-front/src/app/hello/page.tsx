import React from 'react';
import axios from 'axios';

type HelloWorld = {
  message: string;
};

export default async function HelloPage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_JAVA_API_BASE_URL;
  let message = '通信失敗です';

  try {
    const response = await axios.get<HelloWorld>(`${apiBaseUrl}/api/hello`);
    message = response.data.message;
  } catch (error) {
    console.error('通信失敗:', error);
  }

  return (
    <div>
      <h1>javaからの返却メッセージ</h1>
      <p>{message}</p>
    </div>
  );
}
