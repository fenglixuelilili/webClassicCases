
// 权限设计
// 用户的权限 code
 
let userCode = ""
 
 
// 假设系统里有这些权限
 
// 纯模拟，正常情况下是按顺序的，如 0,0 0,1 0,2 ...，尽可能占满一个权限空间，再使用下一个
 
const permissions = {
 
    SYS_SETTING: {
    
    value: "0,0", // index = 0, pos = 0
    
    info: "系统权限"
    
    },
    
    DATA_ADMIN: {
    
    value: "0,8",
    
    info: "数据库权限"
    
    },
    
    USER_ADD: {
    
    value: "0,22",
    
    info: "用户新增权限"
    
    },
    
    USER_EDIT: {
    
    value: "0,30",
    
    info: "用户编辑权限"
    
    },
    
    USER_VIEW: {
    
    value: "1,2", // index = 1, pos = 2
    
    info: "用户查看权限"
    
    },
    
    USER_DELETE: {
    
    value: "1,17",
    
    info: "用户删除权限"
    
    },
    
    POST_ADD: {
    
    value: "1,28",
    
    info: "文章新增权限"
    
    },
    
    POST_EDIT: {
    
    value: "2,4",
    
    info: "文章编辑权限"
    
    },
    
    POST_VIEW: {
    
    value: "2,19",
    
    info: "文章查看权限"
    
    },
    
    POST_DELETE: {
    
    value: "2,26",
    
    info: "文章删除权限"
    
    }
 
}
// 添加权限
const addPermission = (userCode, permission) => {
    const userPermission = userCode ? userCode.split(",") : []

    // 拿取到index 和 pos
    const [index, pos] = permission.value.split(",")

    

    userPermission[index] = (userPermission[index] || 0) | Math.pow(2, pos)

    return userPermission.join(",")
}
// console.log(addPermission(userCode,permissions['DATA_ADMIN']),'xxxxxx')
userCode = addPermission(userCode,permissions['DATA_ADMIN'])
// return
// 删除权限
const delPermission = (userCode, permission) => {
    const userPermission = userCode ? userCode.split(",") : [] // 将当前用户的权限取出
    const [index, pos] = permission.value.split(",") // 将核心权限取出
    userPermission[index] = (userPermission[index] || 0) & (~Math.pow(2, pos)) // 删除权限
    return userPermission.join(",")
}
// 判断是否有权限
const hasPermission = (userCode, permission) => {
    const userPermission = userCode ? userCode.split(",") : []
    const [index, pos] = permission.value.split(",")
    const permissionValue = Math.pow(2, pos)
    return (userPermission[index] & permissionValue) === permissionValue
}
console.log(hasPermission(userCode,permissions['DATA_ADMIN']))
// return
// 列出用户拥有的全部权限
const listPermission = userCode => {
    const results = []
    if (!userCode) {
        return results
    }
    Object.values(permissions).forEach(permission => {
        if (hasPermission(userCode, permission)) {
            results.push(permission.info)
        }
    })
    return results
}
console.log(listPermission(userCode))
return
const log = () => {
    console.log(`userCode: ${JSON.stringify(userCode, null, " ")}`)
    console.log(`权限列表: ${listPermission(userCode).join("; ")}`)
    console.log("")
}
userCode = addPermission(userCode, permissions.SYS_SETTING)
log()
// userCode: "1"
// 权限列表: 系统权限
userCode = addPermission(userCode, permissions.POST_EDIT)
log()
// userCode: "1,,16"
// 权限列表: 系统权限; 文章编辑权限
userCode = addPermission(userCode, permissions.USER_EDIT)
log()
// userCode: "1073741825,16"
// 权限列表: 系统权限; 用户编辑权限; 文章编辑权限
userCode = addPermission(userCode, permissions.USER_DELETE)
log()
// userCode: "1073741825,131072,16"
// 权限列表: 系统权限; 用户编辑权限; 用户删除权限; 文章编辑权限
 
 
userCode = delPermission(userCode, permissions.USER_EDIT)
 
log()
 
// userCode: "1,131072,16"
 
// 权限列表: 系统权限; 用户删除权限; 文章编辑权限
 
 
userCode = delPermission(userCode, permissions.USER_EDIT)
 
log()
 
// userCode: "1,131072,16"
 
// 权限列表: 系统权限; 用户删除权限; 文章编辑权限
 
 
userCode = delPermission(userCode, permissions.USER_DELETE)
 
userCode = delPermission(userCode, permissions.SYS_SETTING)
 
userCode = delPermission(userCode, permissions.POST_EDIT)
 
log()
 
// userCode: "0,0,0"
 
// 权限列表:
 
 
userCode = addPermission(userCode, permissions.SYS_SETTING)
 
log()
 
// userCode: "1,0,0"
// 权限列表: 系统权限