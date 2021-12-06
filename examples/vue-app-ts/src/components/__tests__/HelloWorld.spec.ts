import { mount } from "@vue/test-utils";
import App from "@/App.vue";

test("hellow world", async () => {
  const wrapper = mount(App);
  expect(wrapper.html()).toMatch("Hello Vue 3 + TypeScript + Vite</h1>");
});
