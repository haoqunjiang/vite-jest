import { mount } from "@vue/test-utils";
import App from "@/src/App.vue";


test("hellow world", async () => {
  const wrapper = mount(App);
  expect(wrapper.html()).toBe("<h1>Hello World</h1>");
});
