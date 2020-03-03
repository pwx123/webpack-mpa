declare namespace mui {
    function init(setting?: any): any
    function toast(setting: any): void
    function plusReady(callback: Function): void
    function fire(webview: any, name: string, data?: Object): void
    function alert(msg: string, title?: string): void
    let prompt: Function
}
declare function mui(selector: string): any