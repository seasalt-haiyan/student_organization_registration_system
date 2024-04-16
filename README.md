## 功能概述
- 身份选择：用户可以选择“学生”或“管理员”身份，以进入不同的功能区域。
学生报名：学生可以填写个人信息、选择专业班级、选择第一和第二志愿组织、部门及其原因，并提交申请。

- 管理员登录和管理：管理员可以登录系统，查看所有学生的申请、编辑或删除申请。
  
- 数据校验：系统提供前端数据校验，确保数据的正确性和完整性。每个条目都有对应的验证规则，也不可以为空，其中，第二志愿的表单验证为动态的，如果用户没选择第二志愿组织，则第二志愿部门和第二志愿原因为非必填，如果用户选择了第二志愿，则都为必填项
- 分页搜索，模糊搜索，还有分页显示等功能

- 响应式设计：使用Element UI保持界面美观和响应式。
## 技术栈
- Vue.js：前端框架，用于构建用户界面。
- Vue Router：Vue.js 的官方路由管理器，用于构建单页面应用（SPA）的路由系统。
- Element UI：基于 Vue 2.0 的桌面端组件库，用于快速构建页面和表单。
- axios：用于浏览器和 node.js 的 HTTP 客户端，处理请求和响应。
## 亮点
- 用户体验：通过清晰的表单布局和即时反馈，提供优秀的用户交互体验。

- 动态内容加载：根据用户的选择动态加载相关的班级和部门选项,可以通过选择的专业自动匹配对应的班级，选择的组织自动匹配对应的部门，同时保证第一志愿选择过的不会再被第二志愿选择

- 安全性：实现了基本的登录功能和路由守卫，保护管理区域的访问。

- 高度模块化：代码高度模块化，易于维护和扩展。
## 难点与挑战
- 表单管理：管理复杂表单状态，尤其是依赖选择更新其他选项的逻辑。

- 用户认证：实现一个简单的认证流程，保护敏感操作。

- 数据联动：实现多级下拉菜单之间的数据联动，确保数据的一致性和正确性。
