import { mount } from "@vue/test-utils";
import HelloWorld from "../HelloWorld.vue";

test("hellow world", async () => {
  const wrapper = mount(HelloWorld, { props: { msg: 'Hello Cypress' } })
  expect(wrapper.html()).toMatch("Hello Cypress");
});
