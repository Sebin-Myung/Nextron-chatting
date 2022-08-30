import { ComponentMeta, ComponentStory } from '@storybook/react'
import AlertBox from '../renderer/components/atoms/AlertBox'

export default {
  title: 'Atoms/AlertBox',
  component: AlertBox,
} as ComponentMeta<typeof AlertBox>

const Template: ComponentStory<typeof AlertBox> = (args) => <AlertBox {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "비밀번호가 일치하지 않습니다."
}