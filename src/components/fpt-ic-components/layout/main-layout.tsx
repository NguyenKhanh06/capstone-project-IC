import React, { FC, ReactNode, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Footer } from '../footer';
import { Header } from '../header';
import { ColorMenuContext, PostContext } from '../../../context/context';
import Messenger from '../../../pages/FPTIC/Messenger';
import { ThemeProvider } from '@mui/material';
import theme from '../../../config/theme';
import { Outlet } from 'react-router-dom';
import Home from 'src/pages/FPTIC/Home';
import { Post } from 'src/interfaces/post';
import axios from 'axios';
import { API_URL } from 'src/config/apiUrl/apis-url';

interface Props {
  children: ReactNode;
}

const MainLayout: FC<Props> = () => {
  const student = JSON.parse(sessionStorage.getItem('student'));

  const [colorMenu, setColorMenu] = useState('primary');
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    let posts: Post[] = [];
    await axios
      .get(`${API_URL}/post/getAllPost`)
      .then((response) => {
        posts = response.data['responseSuccess'];
      })
      .catch((error) => {
        posts = JSON.parse(mockData).responseSuccess;
      });
    setPosts(posts);
  };
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    fetchPosts();
  }, []);
  return (
    <ColorMenuContext.Provider value={{ colorMenu, setColorMenu }}>
      <PostContext.Provider value={{ posts: posts, refreshPost: fetchPosts }}>
        <ThemeProvider theme={theme}>
          <Box component="main" bgcolor={'background.default'}>
            <Header />
            <Outlet />
            <Messenger />
            <Footer />
          </Box>
        </ThemeProvider>
      </PostContext.Provider>
    </ColorMenuContext.Provider>
  );
};

export default MainLayout;

const mockData = String.raw`{
  "isSuccess": true,
  "code": 200,
  "responseSuccess": [
    {
      "id": "0f1e22fb-3061-4ee2-af18-29637f46a818",
      "author": "null",
      "title": "Vì cuộc đời là những chuyến đi, vậy các bạn có muốn cùng IC vi vu trời Thái không nào?\r\nChuyến trải nghiệm 5 ngày 4 đêm tại Bangkok, Thái Lan vẫn luôn sẵn sàng chào đón các bạn. Hãy nhanh tay đăng ký để có cơ hội học tập và khám phá văn hoá tại xứ sở chùa Vàng nhé! ",
      "subTitle": "3",
      "posterUrl": "https://tuanfpt.blob.core.windows.net/image/passso%20%281%29.jpg",
      "content": "3",
      "dateCreated": "2023-04-17T11:51:58.012433",
      "status": false,
      "staffId": "0e2fe259-90f9-4fbe-9c79-e31f35071fbb",
      "staffs": null,
      "postImages": [
        {
          "id": "acb71964-99e6-4cbd-b571-327eb5c4e716",
          "postId": "0f1e22fb-3061-4ee2-af18-29637f46a818",
          "postImageUrl": "https://tuanfpt.blob.core.windows.net/image/df.jpg"
        },
        {
          "id": "bc37ead9-4ce3-43f5-8991-863b60576dbc",
          "postId": "0f1e22fb-3061-4ee2-af18-29637f46a818",
          "postImageUrl": "https://tuanfpt.blob.core.windows.net/image/khanh%20%281%29.jpeg"
        }
      ]
    },
    {
      "id": "3e175e06-4b1f-40ec-91dc-5473edc45f8c",
      "author": "null",
      "title": "1. Chi phí 155 USD sẽ đóng trực tiếp khi đến Thái Lan (bao gồm: chỗ ở, ăn uống 6 bữa ăn trưa + tối, các hoạt động trải nghiệm, giao lưu văn hóa, di chuyển trong chương trình)\r\n2. Vé máy bay (Khoảng 2,5 triệu - 3 triệu): Tự túc hoặc liên hệ IC để được hỗ trợ (ĐẶT CÀNG SỚM VÉ CÀNG RẺ NHA)",
      "subTitle": "1",
      "posterUrl": "https://tuanfpt.blob.core.windows.net/image/khanh.jpeg",
      "content": "1",
      "dateCreated": "2023-04-17T11:51:48.397942",
      "status": false,
      "staffId": "0e2fe259-90f9-4fbe-9c79-e31f35071fbb",
      "staffs": null,
      "postImages": []
    },
    {
      "id": "510f28f0-5bfa-485f-9367-e1efa120d0f6",
      "author": null,
      "title": "Vì cuộc đời là những chuyến đi, vậy các bạn có muốn cùng IC vi vu trời Thái không nào?",
      "subTitle": "Chuyến trải nghiệm 5 ngày 4 đêm tại Bangkok, Thái Lan vẫn luôn sẵn sàng chào đón các bạn. Hãy nhanh tay đăng ký để có cơ hội học tập và khám phá văn hoá tại xứ sở chùa Vàng nhé! ",
      "posterUrl": "https://tuanfpt.blob.core.windows.net/image/passso.jpg",
      "content": "📍 Đối tượng tham gia: Toàn bộ sinh viên Đại học FPT\r\n📍 Thời gian: 03/05/2023 đến 07/05/2023\r\n📍 Link đăng ký: https://bom.so/DphGOx\r\n📍 Hạn đăng ký: đến hết ngày 21/04/2023\r\nVì số lượng có hạn nên BTC sẽ đóng link đăng ký ngay khi hết chỗ.\r\n📍 Các khoản chi phí: \r\n1. Chi phí 155 USD sẽ đóng trực tiếp khi đến Thái Lan (bao gồm: chỗ ở, ăn uống 6 bữa ăn trưa + tối, các hoạt động trải nghiệm, giao lưu văn hóa, di chuyển trong chương trình)\r\n2. Vé máy bay (Khoảng 2,5 triệu - 3 triệu): Tự túc hoặc liên hệ IC để được hỗ trợ (ĐẶT CÀNG SỚM VÉ CÀNG RẺ NHA)\r\n⚠️ Lưu ý: Sinh viên tham gia chương trình cần có sẵn hộ chiếu.",
      "dateCreated": "2023-04-17T10:45:48.09416",
      "status": true,
      "staffId": "70d72c79-b47d-4a93-98f4-26157496a586",
      "staffs": null,
      "postImages": []
    }
  ],
  "responseFailed": null
}`;
