import { ComponentMeta, ComponentStory } from '@storybook/react'
import Divider from '../renderer/components/atoms/Divider'

export default {
  title: 'Atoms/Divider',
  component: Divider,
} as ComponentMeta<typeof Divider>

const Template: ComponentStory<typeof Divider> = () => <Divider />

export const Default = Template