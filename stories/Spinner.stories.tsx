import { ComponentMeta, ComponentStory } from '@storybook/react'
import Spinner from '../renderer/components/atoms/Spinner'

export default {
  title: 'Atoms/Spinner',
  component: Spinner,
} as ComponentMeta<typeof Spinner>

const Template: ComponentStory<typeof Spinner> = () => <Spinner />

export const Default = Template