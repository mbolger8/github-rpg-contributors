/**
 * Copyright 2025 mbolger8
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import '@haxtheweb/rpg-character/rpg-character.js';

/**
 * `github-rpg-contributors`
 * 
 * @demo index.html
 * @element github-rpg-contributors
 */
export class GithubRpgContributors extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "github-rpg-contributors";
  }

  constructor() {
    super();
    this.items = []
    this.org=''
    this.repo=''
    this.title = "";
    this.limit = 25;
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/github-rpg-contributors.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      items: { type: Array },
      org: { type: String },
      repo: { type: String },
      limit: { type: Number },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-default-coalyGray);
        background-color: var(--ddd-theme-default-white);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-2);
      }
      .rpg-wrapper {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        margin: var(--ddd-spacing-2);
        border: var(--ddd-border-xs, 1px);
        padding: var(--ddd-spacing-2);
        border-radius: var(--ddd-radius-sm);
      }
      .rpg-wrapper:hover {
        opacity: 1;
        outline: var(--ddd-border-sm, 2px);
        
      }
      .name {
        margin-top: var(--ddd-spacing-2);
        font-size: var(--ddd-font-size-4xs);
        text-align: center;
      }
      .name:hover {
        text-decoration: underline;
        cursor: pointer;
      }
      .name:active {
        color: var(--ddd-theme-default-original87Pink);
      }
    `];
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("org") || changedProperties.has('repo')) {
      this.getData();
    }
  }
  getData() {
    const url = `https://api.github.com/repos/${this.org}/${this.repo}/contributors`;;
    try {
      fetch(url).then(d => d.ok ? d.json(): {}).then(data => {
        if (data) {
          this.items = [];
          this.items = data;
        }});
      } catch (error) {
        console.error("HI");
      }}

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        ${this.items.filter((item, index) => index < this.limit).map((item) => html`
          <div class="rpg-wrapper">
            <rpg-character seed="${item.login}"></rpg-character>
            <a class="name" href="https://github.com/${item.login}" target="_blank">
              ${item.login}
            </a>
          </div>
            `)}
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(GithubRpgContributors.tag, GithubRpgContributors);