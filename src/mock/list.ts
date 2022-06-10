import { MockMethod } from "vite-plugin-mock";

export default [
    {
        url: "/getCardList",
        method: "post",
        response: () => {
            return {
                code: 0,
                data: {
                    list: [
                        {
                            index: 1,
                            isSetup: true,
                            type: 4,
                            banner: "https://tdesign.gtimg.com/tdesign-pro/cloud-server.jpg",
                            name: "SSL证书",
                            description:
                                "SSL证书又叫服务器证书，腾讯云为您提供证书的一站式服务，包括免费、付费证书的申请、管理及部"
                        }
                    ]
                }
            };
        }
    }
] as MockMethod[];
