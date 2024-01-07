// src/theme.ts

export interface Theme {
  body: string
  text: string
  headerText: string
  toggleBorder: string
  background: string
}

export const lightTheme: Theme = {
  body: '#FFF',
  headerText: '#363537',
  text: '#363537',
  toggleBorder: '#FFF',
  background: '#363537'
}

export const darkTheme: Theme = {
  body: '#363537',
  text: '#363537',
  headerText: '#ffff',
  toggleBorder: '#6B8096',
  background: '#999'
}
