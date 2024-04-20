(module
 (type $none_=>_none (func))
 (type $i32_i32_=>_none (func (param i32 i32)))
 (type $i32_i32_i32_=>_i32 (func (param i32 i32 i32) (result i32)))
 (type $i32_=>_none (func (param i32)))
 (type $i32_i32_i32_i32_=>_none (func (param i32 i32 i32 i32)))
 (type $none_=>_i32 (func (result i32)))
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (memory $0 1)
 (data (i32.const 1025) "\01\02\03\04\05\06\07\08\t\n\0b\0c\0d\0e\0f\0e\n\04\08\t\0f\0d\06\01\0c\00\02\0b\07\05\03\0b\08\0c\00\05\02\0f\0d\n\0e\03\06\07\01\t\04\07\t\03\01\0d\0c\0b\0e\02\06\05\n\04\00\0f\08\t\00\05\07\02\04\n\0f\0e\01\0b\0c\06\08\03\0d\02\0c\06\n\00\0b\08\03\04\0d\07\05\0f\0e\01\t\0c\05\01\0f\0e\0d\04\n\00\07\06\03\t\02\08\0b\0d\0b\07\0e\0c\01\03\t\05\00\0f\04\08\06\02\n\06\0f\0e\t\0b\03\00\08\0c\02\0d\07\01\04\n\05\n\02\08\04\07\06\01\05\0f\0b\t\0e\03\0c\0d\00\00\01\02\03\04\05\06\07\08\t\n\0b\0c\0d\0e\0f\0e\n\04\08\t\0f\0d\06\01\0c\00\02\0b\07\05\03")
 (data (i32.const 1216) "\1a\00\00\00\01\00\00\00\01\00\00\00\1a\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00i\00n\00p\00u\00t")
 (data (i32.const 1264) "\"\00\00\00\01\00\00\00\01\00\00\00\"\00\00\00s\00r\00c\00/\00s\00o\00l\00v\00e\00r\00W\00a\00s\00m\00.\00t\00s")
 (data (i32.const 1328) "\1c\00\00\00\01\00\00\00\01\00\00\00\1c\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00l\00e\00n\00g\00t\00h")
 (data (i32.const 1376) "&\00\00\00\01\00\00\00\01\00\00\00&\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00b\00u\00f\00f\00e\00r\00.\00t\00s")
 (data (i32.const 1440) "&\00\00\00\01\00\00\00\01\00\00\00&\00\00\00~\00l\00i\00b\00/\00s\00t\00a\00t\00i\00c\00a\00r\00r\00a\00y\00.\00t\00s")
 (data (i32.const 1504) "$\00\00\00\01\00\00\00\01\00\00\00$\00\00\00I\00n\00d\00e\00x\00 \00o\00u\00t\00 \00o\00f\00 \00r\00a\00n\00g\00e")
 (data (i32.const 1568) "$\00\00\00\01\00\00\00\01\00\00\00$\00\00\00~\00l\00i\00b\00/\00t\00y\00p\00e\00d\00a\00r\00r\00a\00y\00.\00t\00s")
 (data (i32.const 1632) "\06\00\00\00 \00\00\00\00\00\00\00 \00\00\00\00\00\00\00 \00\00\00\00\00\00\00a\00\00\00\02\00\00\00!\02\00\00\02\00\00\00$\02")
 (global $~lib/rt/stub/startOffset (mut i32) (i32.const 0))
 (global $~lib/rt/stub/offset (mut i32) (i32.const 0))
 (global $src/entryWasm/Uint8Array_ID i32 (i32.const 3))
 (global $~lib/rt/__rtti_base i32 (i32.const 1632))
 (export "memory" (memory $0))
 (export "__alloc" (func $~lib/rt/stub/__alloc))
 (export "__retain" (func $~lib/rt/stub/__retain))
 (export "__release" (func $~lib/rt/stub/__release))
 (export "__collect" (func $~lib/rt/stub/__collect))
 (export "__reset" (func $~lib/rt/stub/__reset))
 (export "__rtti_base" (global $~lib/rt/__rtti_base))
 (export "Uint8Array_ID" (global $src/entryWasm/Uint8Array_ID))
 (export "solveBlake2b" (func $src/solverWasm/solveBlake2bEfficient))
 (start $~start)
 (func $~lib/rt/stub/__alloc (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $0
  i32.const 1073741808
  i32.gt_u
  if
   unreachable
  end
  global.get $~lib/rt/stub/offset
  i32.const 16
  i32.add
  local.tee $4
  local.get $0
  i32.const 15
  i32.add
  i32.const -16
  i32.and
  local.tee $2
  i32.const 16
  local.get $2
  i32.const 16
  i32.gt_u
  select
  local.tee $6
  i32.add
  local.tee $2
  memory.size
  local.tee $5
  i32.const 16
  i32.shl
  local.tee $3
  i32.gt_u
  if
   local.get $5
   local.get $2
   local.get $3
   i32.sub
   i32.const 65535
   i32.add
   i32.const -65536
   i32.and
   i32.const 16
   i32.shr_u
   local.tee $3
   local.get $5
   local.get $3
   i32.gt_s
   select
   memory.grow
   i32.const 0
   i32.lt_s
   if
    local.get $3
    memory.grow
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
  end
  local.get $2
  global.set $~lib/rt/stub/offset
  local.get $4
  i32.const 16
  i32.sub
  local.tee $2
  local.get $6
  i32.store
  local.get $2
  i32.const 1
  i32.store offset=4
  local.get $2
  local.get $1
  i32.store offset=8
  local.get $2
  local.get $0
  i32.store offset=12
  local.get $4
 )
 (func $~lib/rt/stub/__retain (param $0 i32) (result i32)
  local.get $0
 )
 (func $~lib/rt/stub/__release (param $0 i32)
  nop
 )
 (func $~lib/rt/stub/__collect
  nop
 )
 (func $~lib/rt/stub/__reset
  global.get $~lib/rt/stub/startOffset
  global.set $~lib/rt/stub/offset
 )
 (func $~lib/memory/memory.fill (param $0 i32) (param $1 i32)
  (local $2 i32)
  block $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.eqz
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 0
   i32.store8
   local.get $0
   local.get $1
   i32.add
   i32.const 4
   i32.sub
   local.tee $2
   i32.const 0
   i32.store8 offset=3
   local.get $1
   i32.const 2
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 0
   i32.store8 offset=1
   local.get $0
   i32.const 0
   i32.store8 offset=2
   local.get $2
   i32.const 0
   i32.store8 offset=2
   local.get $2
   i32.const 0
   i32.store8 offset=1
   local.get $1
   i32.const 6
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 0
   i32.store8 offset=3
   local.get $2
   i32.const 0
   i32.store8
   local.get $1
   i32.const 8
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 0
   local.get $0
   i32.sub
   i32.const 3
   i32.and
   local.tee $2
   i32.add
   local.tee $0
   i32.const 0
   i32.store
   local.get $0
   local.get $1
   local.get $2
   i32.sub
   i32.const -4
   i32.and
   local.tee $2
   i32.add
   i32.const 28
   i32.sub
   local.tee $1
   i32.const 0
   i32.store offset=24
   local.get $2
   i32.const 8
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 0
   i32.store offset=4
   local.get $0
   i32.const 0
   i32.store offset=8
   local.get $1
   i32.const 0
   i32.store offset=16
   local.get $1
   i32.const 0
   i32.store offset=20
   local.get $2
   i32.const 24
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 0
   i32.store offset=12
   local.get $0
   i32.const 0
   i32.store offset=16
   local.get $0
   i32.const 0
   i32.store offset=20
   local.get $0
   i32.const 0
   i32.store offset=24
   local.get $1
   i32.const 0
   i32.store
   local.get $1
   i32.const 0
   i32.store offset=4
   local.get $1
   i32.const 0
   i32.store offset=8
   local.get $1
   i32.const 0
   i32.store offset=12
   local.get $0
   local.get $0
   i32.const 4
   i32.and
   i32.const 24
   i32.add
   local.tee $1
   i32.add
   local.set $0
   local.get $2
   local.get $1
   i32.sub
   local.set $1
   loop $while-continue|0
    local.get $1
    i32.const 32
    i32.ge_u
    if
     local.get $0
     i64.const 0
     i64.store
     local.get $0
     i64.const 0
     i64.store offset=8
     local.get $0
     i64.const 0
     i64.store offset=16
     local.get $0
     i64.const 0
     i64.store offset=24
     local.get $1
     i32.const 32
     i32.sub
     local.set $1
     local.get $0
     i32.const 32
     i32.add
     local.set $0
     br $while-continue|0
    end
   end
  end
 )
 (func $~lib/arraybuffer/ArrayBufferView#constructor (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $0
  i32.eqz
  if
   i32.const 12
   i32.const 2
   call $~lib/rt/stub/__alloc
   local.set $0
  end
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  i32.const 0
  i32.store offset=8
  local.get $1
  i32.const 1073741808
  local.get $2
  i32.shr_u
  i32.gt_u
  if
   i32.const 1344
   i32.const 1392
   i32.const 18
   i32.const 57
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  local.get $2
  i32.shl
  local.tee $1
  i32.const 0
  call $~lib/rt/stub/__alloc
  local.tee $2
  local.get $1
  call $~lib/memory/memory.fill
  local.get $0
  i32.load
  drop
  local.get $0
  local.get $2
  i32.store
  local.get $0
  local.get $2
  i32.store offset=4
  local.get $0
  local.get $1
  i32.store offset=8
  local.get $0
 )
 (func $src/blake2b/blake2b64/Context#constructor (result i32)
  (local $0 i32)
  (local $1 i32)
  i32.const 160
  i32.const 0
  call $~lib/rt/stub/__alloc
  local.tee $0
  i32.const 12
  i32.const 3
  call $~lib/rt/stub/__alloc
  i32.const 128
  i32.const 0
  call $~lib/arraybuffer/ArrayBufferView#constructor
  i32.store
  local.get $0
  i32.const 12
  i32.const 4
  call $~lib/rt/stub/__alloc
  i32.const 8
  i32.const 3
  call $~lib/arraybuffer/ArrayBufferView#constructor
  i32.store offset=4
  local.get $0
  i64.const 0
  i64.store offset=8
  local.get $0
  i32.const 0
  i32.store offset=16
  local.get $0
  i64.const 0
  i64.store offset=24
  local.get $0
  i64.const 0
  i64.store offset=32
  local.get $0
  i64.const 0
  i64.store offset=40
  local.get $0
  i64.const 0
  i64.store offset=48
  local.get $0
  i64.const 0
  i64.store offset=56
  local.get $0
  i64.const 0
  i64.store offset=64
  local.get $0
  i64.const 0
  i64.store offset=72
  local.get $0
  i64.const 0
  i64.store offset=80
  local.get $0
  i64.const 0
  i64.store offset=88
  local.get $0
  i64.const 0
  i64.store offset=96
  local.get $0
  i64.const 0
  i64.store offset=104
  local.get $0
  i64.const 0
  i64.store offset=112
  local.get $0
  i64.const 0
  i64.store offset=120
  local.get $0
  i64.const 0
  i64.store offset=128
  local.get $0
  i64.const 0
  i64.store offset=136
  local.get $0
  i64.const 0
  i64.store offset=144
  i32.const 128
  i32.const 5
  call $~lib/rt/stub/__alloc
  local.tee $1
  i32.const 128
  call $~lib/memory/memory.fill
  local.get $0
  local.get $1
  i32.store offset=152
  local.get $0
  i32.const 32
  i32.store offset=156
  local.get $0
 )
 (func $src/blake2b/blake2b64/blake2bCompress (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i64)
  (local $5 i64)
  (local $6 i64)
  (local $7 i64)
  (local $8 i64)
  (local $9 i64)
  (local $10 i64)
  (local $11 i64)
  (local $12 i64)
  (local $13 i64)
  (local $14 i64)
  (local $15 i64)
  (local $16 i64)
  (local $17 i64)
  (local $18 i32)
  (local $19 i64)
  (local $20 i64)
  (local $21 i64)
  (local $22 i64)
  local.get $0
  i32.load offset=4
  local.set $2
  local.get $0
  i32.load offset=152
  local.set $3
  loop $for-loop|0
   local.get $18
   i32.const 128
   i32.lt_s
   if
    local.get $3
    local.get $18
    i32.add
    local.get $1
    local.get $18
    i32.add
    i64.load
    i64.store
    local.get $18
    i32.const 8
    i32.add
    local.set $18
    br $for-loop|0
   end
  end
  local.get $2
  i32.load offset=4
  i64.load
  local.set $11
  local.get $2
  i32.load offset=4
  i64.load offset=8
  local.set $12
  local.get $2
  i32.load offset=4
  i64.load offset=16
  local.set $13
  local.get $2
  i32.load offset=4
  i64.load offset=24
  local.set $14
  local.get $2
  i32.load offset=4
  i64.load offset=32
  local.set $4
  local.get $2
  i32.load offset=4
  i64.load offset=40
  local.set $10
  local.get $2
  i32.load offset=4
  i64.load offset=48
  local.set $5
  local.get $2
  i32.load offset=4
  i64.load offset=56
  local.set $6
  i64.const 7640891576956012808
  local.set $7
  i64.const -4942790177534073029
  local.set $8
  i64.const 4354685564936845355
  local.set $15
  i64.const -6534734903238641935
  local.set $9
  local.get $0
  i64.load offset=8
  i64.const 5840696475078001361
  i64.xor
  local.set $16
  i64.const -7276294671716946913
  local.set $17
  i64.const -2270897969802886508
  local.set $19
  i64.const 6620516959819538809
  local.set $20
  i32.const 0
  local.set $18
  loop $for-loop|1
   local.get $18
   i32.const 192
   i32.lt_s
   if
    local.get $4
    local.get $7
    local.get $16
    local.get $11
    local.get $4
    local.get $3
    local.get $18
    i32.const 1024
    i32.add
    local.tee $1
    i32.load8_u
    i32.const 3
    i32.shl
    i32.add
    i64.load
    i64.add
    i64.add
    local.tee $4
    i64.xor
    i64.const 32
    i64.rotr
    local.tee $11
    i64.add
    local.tee $7
    i64.xor
    i64.const 24
    i64.rotr
    local.tee $16
    local.get $7
    local.get $11
    local.get $4
    local.get $16
    local.get $3
    local.get $1
    i32.load8_u offset=1
    i32.const 3
    i32.shl
    i32.add
    i64.load
    i64.add
    i64.add
    local.tee $11
    i64.xor
    i64.const 16
    i64.rotr
    local.tee $7
    i64.add
    local.tee $21
    i64.xor
    i64.const 63
    i64.rotr
    local.set $4
    local.get $10
    local.get $8
    local.get $17
    local.get $12
    local.get $10
    local.get $3
    local.get $1
    i32.load8_u offset=2
    i32.const 3
    i32.shl
    i32.add
    i64.load
    i64.add
    i64.add
    local.tee $12
    i64.xor
    i64.const 32
    i64.rotr
    local.tee $8
    i64.add
    local.tee $16
    i64.xor
    i64.const 24
    i64.rotr
    local.set $10
    local.get $5
    local.get $15
    local.get $19
    local.get $13
    local.get $5
    local.get $3
    local.get $1
    i32.load8_u offset=4
    i32.const 3
    i32.shl
    i32.add
    i64.load
    i64.add
    i64.add
    local.tee $5
    i64.xor
    i64.const 32
    i64.rotr
    local.tee $13
    i64.add
    local.tee $15
    i64.xor
    i64.const 24
    i64.rotr
    local.tee $17
    local.get $15
    local.get $13
    local.get $5
    local.get $17
    local.get $3
    local.get $1
    i32.load8_u offset=5
    i32.const 3
    i32.shl
    i32.add
    i64.load
    i64.add
    i64.add
    local.tee $13
    i64.xor
    i64.const 16
    i64.rotr
    local.tee $19
    i64.add
    local.tee $15
    i64.xor
    i64.const 63
    i64.rotr
    local.set $5
    local.get $6
    local.get $9
    local.get $20
    local.get $14
    local.get $6
    local.get $3
    local.get $1
    i32.load8_u offset=6
    i32.const 3
    i32.shl
    i32.add
    i64.load
    i64.add
    i64.add
    local.tee $6
    i64.xor
    i64.const 32
    i64.rotr
    local.tee $14
    i64.add
    local.tee $9
    i64.xor
    i64.const 24
    i64.rotr
    local.tee $17
    local.get $9
    local.get $14
    local.get $6
    local.get $17
    local.get $3
    local.get $1
    i32.load8_u offset=7
    i32.const 3
    i32.shl
    i32.add
    i64.load
    i64.add
    i64.add
    local.tee $14
    i64.xor
    i64.const 16
    i64.rotr
    local.tee $9
    i64.add
    local.tee $17
    i64.xor
    i64.const 63
    i64.rotr
    local.set $6
    local.get $15
    local.get $9
    local.get $11
    local.get $16
    local.get $8
    local.get $12
    local.get $10
    local.get $3
    local.get $1
    i32.load8_u offset=3
    i32.const 3
    i32.shl
    i32.add
    i64.load
    i64.add
    i64.add
    local.tee $12
    i64.xor
    i64.const 16
    i64.rotr
    local.tee $8
    i64.add
    local.tee $22
    local.get $10
    i64.xor
    i64.const 63
    i64.rotr
    local.tee $11
    local.get $3
    local.get $1
    i32.load8_u offset=8
    i32.const 3
    i32.shl
    i32.add
    i64.load
    i64.add
    i64.add
    local.tee $15
    i64.xor
    i64.const 32
    i64.rotr
    local.tee $9
    i64.add
    local.tee $10
    local.get $15
    local.get $10
    local.get $11
    i64.xor
    i64.const 24
    i64.rotr
    local.tee $16
    local.get $3
    local.get $1
    i32.load8_u offset=9
    i32.const 3
    i32.shl
    i32.add
    i64.load
    i64.add
    i64.add
    local.tee $11
    local.get $9
    i64.xor
    i64.const 16
    i64.rotr
    local.tee $20
    i64.add
    local.tee $15
    local.get $16
    i64.xor
    i64.const 63
    i64.rotr
    local.set $10
    local.get $5
    local.get $17
    local.get $7
    local.get $12
    local.get $5
    local.get $3
    local.get $1
    i32.load8_u offset=10
    i32.const 3
    i32.shl
    i32.add
    i64.load
    i64.add
    i64.add
    local.tee $12
    i64.xor
    i64.const 32
    i64.rotr
    local.tee $7
    i64.add
    local.tee $9
    i64.xor
    i64.const 24
    i64.rotr
    local.tee $5
    local.get $12
    local.get $5
    local.get $3
    local.get $1
    i32.load8_u offset=11
    i32.const 3
    i32.shl
    i32.add
    i64.load
    i64.add
    i64.add
    local.tee $12
    local.get $7
    i64.xor
    i64.const 16
    i64.rotr
    local.tee $16
    local.get $9
    i64.add
    local.tee $9
    i64.xor
    i64.const 63
    i64.rotr
    local.set $5
    local.get $6
    local.get $21
    local.get $8
    local.get $13
    local.get $6
    local.get $3
    local.get $1
    i32.load8_u offset=12
    i32.const 3
    i32.shl
    i32.add
    i64.load
    i64.add
    i64.add
    local.tee $13
    i64.xor
    i64.const 32
    i64.rotr
    local.tee $7
    i64.add
    local.tee $8
    i64.xor
    i64.const 24
    i64.rotr
    local.tee $6
    local.get $13
    local.get $6
    local.get $3
    local.get $1
    i32.load8_u offset=13
    i32.const 3
    i32.shl
    i32.add
    i64.load
    i64.add
    i64.add
    local.tee $13
    local.get $7
    i64.xor
    i64.const 16
    i64.rotr
    local.tee $17
    local.get $8
    i64.add
    local.tee $7
    i64.xor
    i64.const 63
    i64.rotr
    local.set $6
    local.get $4
    local.get $22
    local.get $19
    local.get $14
    local.get $4
    local.get $3
    local.get $1
    i32.load8_u offset=14
    i32.const 3
    i32.shl
    i32.add
    i64.load
    i64.add
    i64.add
    local.tee $14
    i64.xor
    i64.const 32
    i64.rotr
    local.tee $8
    i64.add
    local.tee $21
    i64.xor
    i64.const 24
    i64.rotr
    local.tee $4
    local.get $14
    local.get $4
    local.get $3
    local.get $1
    i32.load8_u offset=15
    i32.const 3
    i32.shl
    i32.add
    i64.load
    i64.add
    i64.add
    local.tee $14
    local.get $8
    i64.xor
    i64.const 16
    i64.rotr
    local.tee $19
    local.get $21
    i64.add
    local.tee $8
    i64.xor
    i64.const 63
    i64.rotr
    local.set $4
    local.get $18
    i32.const 16
    i32.add
    local.set $18
    br $for-loop|1
   end
  end
  local.get $2
  i32.load offset=4
  local.get $2
  i32.load offset=4
  i64.load
  local.get $7
  local.get $11
  i64.xor
  i64.xor
  i64.store
  local.get $2
  i32.load offset=4
  local.get $2
  i32.load offset=4
  i64.load offset=8
  local.get $8
  local.get $12
  i64.xor
  i64.xor
  i64.store offset=8
  local.get $2
  i32.load offset=4
  local.get $2
  i32.load offset=4
  i64.load offset=16
  local.get $13
  local.get $15
  i64.xor
  i64.xor
  i64.store offset=16
  local.get $2
  i32.load offset=4
  local.get $2
  i32.load offset=4
  i64.load offset=24
  local.get $9
  local.get $14
  i64.xor
  i64.xor
  i64.store offset=24
  local.get $2
  i32.load offset=4
  local.get $2
  i32.load offset=4
  i64.load offset=32
  local.get $4
  local.get $16
  i64.xor
  i64.xor
  i64.store offset=32
  local.get $2
  i32.load offset=4
  local.get $2
  i32.load offset=4
  i64.load offset=40
  local.get $10
  local.get $17
  i64.xor
  i64.xor
  i64.store offset=40
  local.get $2
  i32.load offset=4
  local.get $2
  i32.load offset=4
  i64.load offset=48
  local.get $5
  local.get $19
  i64.xor
  i64.xor
  i64.store offset=48
  local.get $2
  i32.load offset=4
  local.get $2
  i32.load offset=4
  i64.load offset=56
  local.get $6
  local.get $20
  i64.xor
  i64.xor
  i64.store offset=56
  local.get $0
  local.get $11
  i64.store offset=24
  local.get $0
  local.get $12
  i64.store offset=32
  local.get $0
  local.get $13
  i64.store offset=40
  local.get $0
  local.get $14
  i64.store offset=48
  local.get $0
  local.get $4
  i64.store offset=56
  local.get $0
  local.get $10
  i64.store offset=64
  local.get $0
  local.get $5
  i64.store offset=72
  local.get $0
  local.get $6
  i64.store offset=80
  local.get $0
  local.get $7
  i64.store offset=88
  local.get $0
  local.get $8
  i64.store offset=96
  local.get $0
  local.get $15
  i64.store offset=104
  local.get $0
  local.get $9
  i64.store offset=112
  local.get $0
  local.get $16
  i64.store offset=120
  local.get $0
  local.get $17
  i64.store offset=128
  local.get $0
  local.get $19
  i64.store offset=136
  local.get $0
  local.get $20
  i64.store offset=144
 )
 (func $src/solverWasm/solveBlake2bEfficient (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $0
  i32.load offset=8
  i32.const 128
  i32.ne
  if
   i32.const 1232
   i32.const 1280
   i32.const 30
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.load
  local.set $4
  call $src/blake2b/blake2b64/Context#constructor
  local.tee $3
  i32.load offset=4
  local.set $5
  local.get $3
  i64.const 128
  i64.store offset=8
  local.get $4
  i32.load offset=124
  local.tee $0
  local.get $2
  i32.add
  local.set $6
  loop $for-loop|0
   local.get $0
   local.get $6
   i32.lt_u
   if
    local.get $4
    local.get $0
    i32.store offset=124
    local.get $3
    i32.load offset=4
    local.tee $2
    i32.load offset=4
    local.get $3
    i32.load offset=156
    i64.extend_i32_u
    i64.const 7640891576939301128
    i64.xor
    i64.store
    local.get $2
    i32.load offset=4
    i64.const -4942790177534073029
    i64.store offset=8
    local.get $2
    i32.load offset=4
    i64.const 4354685564936845355
    i64.store offset=16
    local.get $2
    i32.load offset=4
    i64.const -6534734903238641935
    i64.store offset=24
    local.get $2
    i32.load offset=4
    i64.const 5840696475078001361
    i64.store offset=32
    local.get $2
    i32.load offset=4
    i64.const -7276294671716946913
    i64.store offset=40
    local.get $2
    i32.load offset=4
    i64.const 2270897969802886507
    i64.store offset=48
    local.get $2
    i32.load offset=4
    i64.const 6620516959819538809
    i64.store offset=56
    local.get $3
    local.get $4
    call $src/blake2b/blake2b64/blake2bCompress
    local.get $5
    i32.load offset=4
    i64.load
    i32.wrap_i64
    local.get $1
    i32.lt_u
    if
     i32.const 0
     local.get $5
     i32.load
     local.tee $1
     i32.const 16
     i32.sub
     i32.load offset=12
     local.tee $2
     i32.gt_u
     if
      i32.const 1520
      i32.const 1584
      i32.const 1741
      i32.const 5
      call $~lib/builtins/abort
      unreachable
     end
     i32.const 12
     i32.const 3
     call $~lib/rt/stub/__alloc
     local.tee $0
     local.get $1
     i32.store
     local.get $0
     local.get $2
     i32.store offset=8
     local.get $0
     local.get $1
     i32.store offset=4
     local.get $0
     return
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  i32.const 12
  i32.const 3
  call $~lib/rt/stub/__alloc
  i32.const 0
  i32.const 0
  call $~lib/arraybuffer/ArrayBufferView#constructor
 )
 (func $~start
  i32.const 1696
  global.set $~lib/rt/stub/startOffset
  i32.const 1696
  global.set $~lib/rt/stub/offset
 )
)
