module.exports = """
@font-face{font-family:'Inconsolata';font-style:normal;font-weight:normal;src:local('Inconsolata'),url('Inconsolata.woff') format('woff');}html,body{margin:0;height:100%;}
.terminal ::selection{background:#0080ff;text-shadow:none !important;}
.terminal{min-height:100%;position:relative;width:100%;}
.terminal .container{padding:1em 1.5em 1em 1em;position:relative;text-shadow:0 0 5px #C8C8C8;}
.terminal .container output{clear:both;width:100%;}
.terminal .container output pre{margin:0;}
.terminal .cmdline{background-color:transparent;border:none;color:inherit;font:inherit;margin:0;outline:none;width:100%;}
.terminal .hidden{display:none;}
.terminal output table.input-line td:last-child{padding-left:1px;}
.terminal .prompt{line-height:20px;margin-right:7px;white-space:nowrap;}
.terminal table.input-line{border-collapse:collapse;border-spacing:0;margin:0;padding:0;width:100%;}
.terminal table.input-line td{margin:0;padding:0;}
.terminal-interlaced{color:white;font-family:Inconsolata, monospace;}
.terminal-interlaced a{color:#fff;}
.terminal-interlaced a.external{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA9QTFRFzs7OqKio0NDQ////////DlgqrAAAAAV0Uk5T/////wD7tg5TAAAAN0lEQVR42izLyQ0AMAgDQYPpv+b4yD7QEBGcYoI0yN454Sqy9KnfTUufQpB7c/9AM1RlE58AAwBEcAE4zo3mOAAAAABJRU5ErkJggg==") no-repeat scroll right center transparent;padding-right:13px;outline:none;}
.terminal-interlaced .background{background:url("data:image/png,base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAMAAACuX0YVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAA////pdmf3QAAAAJ0Uk5T/wDltzBKAAAADklEQVR42mJgYGAECDAAAAUAAoeC334AAAAASUVORK5CYII=") top left repeat,rgba(0, 0, 0, 0.9);height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%;}
.terminal-interlaced .background .interlace{background:url("data:image/png,base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAMAAACuX0YVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAA////pdmf3QAAAAJ0Uk5T/wDltzBKAAAADklEQVR42mJgYGAECDAAAAUAAoeC334AAAAASUVORK5CYII=") top left repeat,transparent;height:100%;left:0;opacity:0.15;pointer-events:none;position:absolute;top:0;width:100%;z-index:10;}
.terminal-interlaced .container output pre{color:white;font-family:Inconsolata, monospace;}
.terminal-interlaced .prompt{color:#fc0;}
.terminal-modern{color:white;font-family:Inconsolata, monospace;}
.terminal-modern a{color:#fff;}
.terminal-modern a.external{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA9QTFRFzs7OqKio0NDQ////////DlgqrAAAAAV0Uk5T/////wD7tg5TAAAAN0lEQVR42izLyQ0AMAgDQYPpv+b4yD7QEBGcYoI0yN454Sqy9KnfTUufQpB7c/9AM1RlE58AAwBEcAE4zo3mOAAAAABJRU5ErkJggg==") no-repeat scroll right center transparent;padding-right:13px;outline:none;}
.terminal-modern .background{background:#000;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%;}
.terminal-modern .background .interlace{display:none;}
.terminal-modern .container{text-shadow:none;}
.terminal-modern .container output pre{color:white;font-family:Inconsolata, monospace;}
.terminal-modern .prompt{color:#fc0;}
.terminal-white{color:black;font-family:Inconsolata, monospace;}
.terminal-white a{color:#000;}
.terminal-white .background{background:#fff;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%;}
.terminal-white .background .interlace{display:none;}
.terminal-white .container{text-shadow:none;}
.terminal-white .container output pre{color:black;font-family:Inconsolata, monospace;}
.terminal-white .prompt{color:#02f;}

"""