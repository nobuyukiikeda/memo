function create_shader(id){
    // シェーダを格納する変数
    var shader;
    
    // HTMLからscriptタグへの参照を取得
    var scriptElement = document.getElementById(id);
    
    // scriptタグが存在しない場合は抜ける
    if(!scriptElement){return;}
    
    // scriptタグのtype属性をチェック
    switch(scriptElement.type){

        // 頂点シェーダの場合
        case 'x-shader/x-vertex':
        shader = gl.createShader(gl.VERTEX_SHADER);
        break;

        // フラグメントシェーダの場合
        case 'x-shader/x-fragment':
        shader = gl.createShader(gl.FRAGMENT_SHADER);
        break;
        default :
        return;
    }
    
    // 生成されたシェーダにソースを割り当てる
    gl.shaderSource(shader, scriptElement.text);
    
    // シェーダをコンパイルする
    gl.compileShader(shader);
    
    // シェーダが正しくコンパイルされたかチェック
    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){

        // 成功していたらシェーダを返して終了
        return shader;
    }else{

        // 失敗していたらエラーログをアラートする
        alert(gl.getShaderInfoLog(shader));
    }
}

function create_program(vs, fs){
    // プログラムオブジェクトの生成
    var program = gl.createProgram();
    
    // プログラムオブジェクトにシェーダを割り当てる
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    
    // シェーダをリンク
    gl.linkProgram(program);
    
    // シェーダのリンクが正しく行なわれたかチェック
    if(gl.getProgramParameter(program, gl.LINK_STATUS)){

        // 成功していたらプログラムオブジェクトを有効にする
        gl.useProgram(program);
        
        // プログラムオブジェクトを返して終了
        return program;
    }else{

        // 失敗していたらエラーログをアラートする
        alert(gl.getProgramInfoLog(program));
    }
}

// 行列

var vertex_position = [
    // X,   Y,   Z
     0.0, 1.0, 0.0,
     1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0
];

// バッファ

function create_vbo(data){
    // バッファオブジェクトの生成
    var vbo = gl.createBuffer();
    
    // バッファをバインドする
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    
    // バッファにデータをセット
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    
    // バッファのバインドを無効化
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
    // 生成した VBO を返して終了
    return vbo;
}

// matIVオブジェクトを生成
var m = new matIV();

// 行列の生成と初期化
var Matrix = m.identity(m.create());
m.translate(Matrix, [1.0, 0.0, 0.0], Matrix);

// 各種行列の生成と初期化
var mMatrix = m.identity(m.create());   // モデル変換行列
var vMatrix = m.identity(m.create());   // ビュー変換行列
var pMatrix = m.identity(m.create());   // プロジェクション変換行列
var mvpMatrix = m.identity(m.create()); // 最終座標変換行列

// 各行列を掛け合わせる順序を示す一例
m.multiply(pMatrix, vMatrix, mvpMatrix); // p に v を掛ける
m.multiply(mvpMatrix, mMatrix, mvpMatrix); // さらに m を掛ける









