
const user = {
  openapi: "3.0.2",
  title: "User",
  info: {
    description:
      "This is a  Example of Node Fanease api with Request and response",
    version: "3.0.0",
    title: "Fan-ease API",
    contact: {
      email: "abc@gmail.com",
    },
    license: {
      name: "Apache 2.0",
      url: "http://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  schemes: ["http"],
  host: "localhost:3057",
  basePath: "/api",
  paths: {
    "/user/login": {
      post: {
        tags: ["User"],
        summary: "user login",
        description: "user login",
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "You should pass here email",
            required: true,
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    "/user/signup": {
      post: {
        tags: ["User"],
        summary: "user login",
        description: "user login",
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "You should pass parameter here",
            required: true,
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
                phone: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
                role: {
                  type: "string",
                },
                isdelete: {
                  type: "string",
                },
                lastlogindate: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    "/user/forgot-password": {
      post: {
        tags: ["User"],
        summary: "forgot-password",
        description: "forgot-password",
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "You should pass parameter here",
            required: true,
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    "/user/like-dislike/609ba74dccaa8d2e292fe75f/0": {
      get: {
        tags: ["User"],
        summary: "like-dislike",
        description: "flike-dislike",
        produces: ["application/json"],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    "/user/site-information-test/test123/test-xyz": {
      get: {
        tags: ["User"],
        summary: "site-information-test",
        description: "site-information-test by id",
        produces: ["application/json"],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    /***************************************************************************** */
    "/video/add-video": {
      post: {
        tags: ["Video"],
        summary: "add video",
        description: "add video",
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "You should pass parameter here",
            required: true,
            schema: {
              type: "object",
              properties: {
                userId: {
                  type: "string",
                },
                videoImage: {
                  type: "string",
                },
                videoBeneathImage: {
                  type: "string",
                },
                videoTitle: {
                  type: "string",
                },
                videoSlug: {
                  type: "string",
                },
                videoDescription: {
                  type: "string",
                },
                videoDate: {
                  type: "string",
                },
                videoTime: {
                  type: "string",
                },
                videoTimeStatus: {
                  type: "string",
                },
                videoType: {
                  type: "string",
                },
                videoStatus: {
                  type: "string",
                },
                videoUrl: {
                  type: "string",
                },
                video: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    "/video/lists/60901a7797680168147b3eb8/2/1": {
      get: {
        tags: ["Video"],
        summary: "get video",
        description: "get video",
        produces: ["application/json"],

        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },

    "/videos": {
      get: {
        tags: ["Video"],
        summary: "get video list",
        description: "get video list",
        produces: ["application/json"],
        //   parameters: [
        //     {
        //       in: "body",
        //       name: "body",
        //       description: "You should pass parameter here",
        //       required: true,
        //       schema: {
        //         type: "object",
        //         properties: {
        //           userId: {
        //             type: "string",
        //           },
        //           videoImage: {
        //             type: "string",
        //           },
        //           videoBeneathImage: {
        //             type: "string",
        //           },
        //           videoTitle: {
        //             type: "string",
        //           },
        //           videoSlug: {
        //             type: "string",
        //           },
        //           videoDescription: {
        //             type: "string",
        //           },
        //           videoDate: {
        //             type: "string",
        //           },
        //           videoTime: {
        //             type: "string",
        //           },
        //           videoTimeStatus: {
        //             type: "string",
        //           },
        //           videoType: {
        //             type: "string",
        //           },
        //           videoStatus: {
        //             type: "string",
        //           },
        //           videoUrl: {
        //             type: "string",
        //           },
        //           video: {
        //             type: "string",
        //           },
        //         },
        //       },
        //     },
        //   ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    "/video/update-video/609141a354dbca42a6ed25a9": {
      put: {
        tags: ["Video"],
        summary: "update video",
        description: "update video",
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "You should pass parameter here",
            required: true,
            schema: {
              type: "object",
              properties: {
                videoTitle: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    "/video/update/60c75521cc7d7b7acf712f50": {
      put: {
        tags: ["Video"],
        summary: "update video",
        description: "update video",
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "You should pass parameter here",
            required: true,
            schema: {
              type: "object",
              properties: {
                userId: {
                  type: "string",
                },
                videoImage: {
                  type: "string",
                },
                videoTitle: {
                  type: "string",
                },
                videoSlug: {
                  type: "string",
                },
                videoDescription: {
                  type: "string",
                },
                videoTime: {
                  type: "string",
                },
                videoDate: {
                  type: "string",
                },
                videoTimeStatus: {
                  type: "string",
                },
                videoType: {
                  type: "string",
                },
                videoStatus: {
                  type: "string",
                },
                videoUrl: {
                  type: "string",
                },
                video: {
                  type: "string",
                },
                isDefult: {
                  type: "boolean",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    /******************************************************************************** */
    "/assets/add-assets": {
      post: {
        tags: ["Assets"],
        summary: "add assets",
        description: "add assets",
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "You should pass parameter here",
            required: true,
            schema: {
              type: "object",
              properties: {
                userId: {
                  type: "string",
                },
                advertisementTitle: {
                  type: "string",
                },
                advertisementPlace: {
                  type: "string",
                },
                advertisementDescription: {
                  type: "string",
                },
                buttonText: {
                  type: "string",
                },
                template: {
                  type: "Number",
                },
                subtemplate: {
                  type: "string",
                },
                nextscreenbodyText: {
                  type: "string",
                },
                nextscreenbuttonText: {
                  type: "string",
                },
                nextscreenheaderText: {
                  type: "string",
                },
                positionClass: {
                  type: "string",
                },
                redirecturl: {
                  type: "string",
                },
                e_hours: {
                  type: "Number",
                },
                s_hours: {
                  type: "Number",
                },
                contenttype: {
                  type: "string",
                },
                content: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    "/assets/update/60a4d6a0c361c82a7c57416a": {
      put: {
        tags: ["Assets"],
        summary: "update assets",
        description: "update assets by id",
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "You should pass parameter here",
            required: true,
            schema: {
              type: "object",
              properties: {
                userId: {
                  type: "string",
                },
                videoId: {
                  type: "string",
                },
                advertisementDescription: {
                  type: "string",
                },
                advertisementPlace: {
                  type: "string",
                },
                contenttype: {
                  type: "string",
                },
                content: {
                  type: "string",
                },
                redirecturl: {
                  type: "Number",
                },
                positionClass: {
                  type: "string",
                },
                e_hours: {
                  type: "Number",
                },
                s_hours: {
                  type: "Number",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    "/assets/list/609cf26b14c4444ff0232935": {
      get: {
        tags: ["Assets"],
        summary: "update assets",
        description: "update assets by id",
        produces: ["application/json"],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    "/assets/lists/60901a7797680168147b3eb8": {
      get: {
        tags: ["Assets"],
        summary: "update assets",
        description: "update assets by id",
        produces: ["application/json"],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    /********************************************************************************* */
    "/userwithauth/account-analysis/60901a7797680168147b3eb8": {
      get: {
        tags: ["User with Auth"],
        summary: "account-analysis",
        description: "account-analysis by id",
        produces: ["application/json"],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    "/userwithauth/check-domain": {
      post: {
        tags: ["User with Auth"],
        summary: "check-domain",
        description: "check-domain",
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "You should pass parameter here",
            required: true,
            schema: {
              type: "object",
              properties: {
                repoName: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    "/userwithauth/update-user/60c7492ecc7d7b7acf712f4b": {
      put: {
        tags: ["User with Auth"],
        summary: "Update User",
        description: "update user by id",
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "You should pass parameter here",
            required: true,
            schema: {
              type: "object",
              properties: {
                repoName: {
                  type: "string",
                },
                domainTitle: {
                  type: "string",
                },
                headerlogo: {
                  type: "string",
                },
                footerlogo: {
                  type: "string",
                },
                footertext: {
                  type: "string",
                },
                facebook: {
                  type: "string",
                },
                twitter: {
                  type: "string",
                },
                instagram: {
                  type: "string",
                },
                formStatus: {
                  type: "string",
                },
                templateTheme: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    /************************************************************************************ */
    "/campaign/add-campaign": {
      post: {
        tags: ["Campaign"],
        summary: "add-campaign",
        description: "add-campaign",
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "You should pass parameter here",
            required: true,
            schema: {
              type: "object",
              properties: {
                campaignTitle: {
                  type: "string",
                },
                start: {
                  type: "string",
                },
                end: {
                  type: "string",
                },
                assetsId: {
                  type: "array",
                  item: { type: "string" },
                  example: [
                    { a_id: "60a4d6a0c361c82a7c57416a" },
                    { a_id: "60acc6ae76b53c18c266f9fb" },
                    { a_id: "60ae5003b4e1e43a862f18ae" },
                  ],
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    "/campaign/lists/60e456db6c7a8312a102ac65/0/5": {
      get: {
        tags: ["Campaign"],
        summary: "Campaign lists",
        description: "Campaign lists",
        produces: ["application/json"],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    "/campaign/list-by-videoid/60e546c9817e314e27a97d2e": {
      get: {
        tags: ["Campaign"],
        summary: "list by videoid",
        description: "list-by-videoid",
        produces: ["application/json"],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    /*********************************************************************************** */
    "/analytics/get-video-engagement/609ba74dccaa8d2e292fe75f": {
      put: {
        tags: ["Analytics"],
        summary: "get-video-engagement",
        description: "get-video-engagement",
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "You should pass parameter here",
            required: true,
            schema: {
              type: "object",
              properties: {
                start: {
                  type: "string",
                },
                end: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    "/analytics/get-watch-ratio/60e546c9817e314e27a97d2e": {
      put: {
        tags: ["Analytics"],
        summary: "get-watch-ratio",
        description: "get-watch-ratio",
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "You should pass parameter here",
            required: true,
            schema: {
              type: "object",
              properties: {
                start: {
                  type: "string",
                },
                end: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    "/analytics/get-advertisement-engagement/60e546c9817e314e27a97d2e": {
      put: {
        tags: ["Analytics"],
        summary: "get-advertisement-engagement",
        description: "get-advertisement-engagement",
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "You should pass parameter here",
            required: true,
            schema: {
              type: "object",
              properties: {
                start: {
                  type: "string",
                },
                end: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    "/analytics/visit-count/60e45cff6c7a8312a102ac8c": {
      get: {
        tags: ["Analytics"],
        summary: "visit count",
        description: "visit count",
        produces: ["application/json"],

        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
    "/analytics/visit-count/60e546c9817e314e27a97d2e": {
      put: {
        tags: ["Analytics"],
        summary: "visit-count",
        description: "visit-count",
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "You should pass parameter here",
            required: true,
            schema: {
              type: "object",
              properties: {
                start: {
                  type: "string",
                },
                end: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          "200": {
            description: "successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/todosResponse",
              },
            },
          },
          "400": {
            description: "Invalid status value",
            schema: {
              $ref: "#/definitions/InvalidResponse",
            },
          },
        },
      },
    },
  },
  definitions: {
    todosResponse: {
      type: "object",
      properties: {
        id: {
          type: "integer",
        },
        task: {
          type: "string",
        },
        assignee: {
          type: "string",
        },
        status: {
          type: "string",
        },
      },
    },
    Task: {
      type: "object",
      properties: {
        task: {
          type: "string",
        },
        assignee: {
          type: "string",
        },
        status: {
          type: "string",
        },
      },
    },
    InvalidResponse: {
      type: "object",
      properties: {
        statusCode: {
          type: "string",
        },
        message: {
          type: "string",
        },
      },
    },
  },
};

export {user}