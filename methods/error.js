var ERROR = (() => {

    var error_strs = {
        'emoticon_not_found' : '찾을 수 없는 이모티콘 입니다.',
        'login_varify_failed' : '로그인 정보가 올바르지 않습니다.',
        'already_fixed' :  '해당 이모티콘은 이미 고정되어 수정이 불가능합니다.',
        'alias_empty' : '별칭을 입력해주세요!',
        'alias_number_over' : '별칭은 최대 5개까지만 사용가능합니다.',
        'alias_length_over' : '별칭은 최대 6글자까지만 가능합니다.',
        'transaction_lock_failed' : '다른 사람이 해당 이모티콘을 수정하고 있습니다.',
        'transaction_sync_failed' : '변경 직전에 다른 사람이 이모티콘 정보를 수정했습니다.',
        'wrong_parameter' : "잘못된 파라미터 서식입니다."
    };

    var errors = {};

    var error_list = Object.keys(error_strs);

    for(let i = 0; i < error_list.length ; i ++){
        Object.defineProperty(errors, error_list[i], {
            get : function(){
                return JSON.stringify({'error' : error_list[i], 'msg': error_strs[error_list[i]]});
            }
        })
    }

    return errors;
})()

exports.ERROR = ERROR;