const { writeFile, readFileSync } = require('fs')
const yaml = require('js-yaml')

const readTheme = f =>
  yaml.safeLoad(readFileSync(`themes/${f}`, 'utf-8'))

// Panda theme color definition
const themeColors = readTheme('colors.yaml')

// Base has the syntax tokens applicable across multiple languages
let base = readTheme('panda-base.yaml')

// Additional theme definitions to combine with base syntax token styles
const workbench = readTheme('workbench.yaml')
const template = readTheme('template.yaml')
const markdown = readTheme('markdown.yaml')
const js = readTheme('js.yaml')
const html = readTheme('html.yaml')
const css = readTheme('css.yaml')
const regex = readTheme('regex.yaml')
const jsdoc = readTheme('jsdoc.yaml')

// Merge workbench styles
Object.assign(base, workbench)
// Merge additional syntax token styles
base.tokenColors = base.tokenColors.concat(
  template,
  markdown,
  js,
  html,
  css,
  regex,
  jsdoc
)

// Stringify all of the combined theme styles so we can run string regexes on it to
// replace color variables with color values
base = JSON.stringify(base, null, 2)

for (let color in themeColors) {
  base = base.replace(
    new RegExp(color + '"', 'g'),
    themeColors[color] + '"'
  )
}

// Base file has been extended with additional theme styles and color variables have
// been replaced with Panda theme values. Write to /dist for consumption.
writeFile('dist/variant.json', base, err => {
  if (err) {
    console.warn(err)
  }
  console.log('Build finished')
})
