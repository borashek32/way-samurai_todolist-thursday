// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum(...nums: Array<number>): number {
    // console.log(nums)
    // console.log(arguments)
    let sum = 0
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i]
    }
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return sum
}


// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number,b: number,c: number): string | undefined {
    //...здесь пишем код.
    if (a + b < c || a + c < b || b + c < a) {
        return "00"
    } else {
        if (a === b && b === c) {
            return '10'
        } else if (a === b || a === c || c === b) {
            return "01"
        } else {
            return "11"
        }
    }

    // В return стоит "заглушка", чтоб typescript не ругался
    // return ""
}


// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number{
    //...здесь пишем код.
    const arrNumStr: Array<string> = String(number).split('')
    let sum = 0
    for (let i = 0; i < arrNumStr.length; i++) {
        let num = Number(arrNumStr[i])
        sum += num
    }

    // В return стоит "заглушка", чтоб typescript не ругался
    return sum

    // тут пробегаем слишком много раз по массиву, хотя читается проще верхнего варианта
    // return number.toString().split('').map(Number).reduce((a, b) => a + b, 0)
}


// 4. Функция isEvenIndexSumGreater принимает  параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    //...здесь пишем код.
    let sum1 = 0 // четные
    let sum2 = 0 // нечетные

    for (let i = 0; i < arr.length; i + 2) { // четные индексы
        sum1 += arr[i]
    }
    for (let j = 1; j < arr.length; j + 2) { // нечетные
        sum2 += arr[j]
    }

    return sum1 > sum2

    // В return стоит "заглушка", чтоб typescript не ругался
    // return true
}

// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив. 
// Новый массив состоит из квадратов целых положительных чисел, котрые являются элементами исходгого массива.
// Исходный массив не мутирует.


export function getSquarePositiveIntegers(array: Array<number>): Array<number> {
    //...здесь пишем код.
    let newArr = []
    for (let i = 0; i < array.length; i++) {
        if (array[i] > 0 && Number.isInteger(array[i])) {
            newArr.push(Math.pow(array[i], 2))
        }
    }
    // В return стоит "заглушка", чтоб typescript не ругался
    return newArr
}

// export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
//     const [sumOfEvenElements, sumOfOddElements] = arr.reduce((res, num, index) => {
//         res[index % 2] += num;
//         return res
//     }, [0, 0])
//     return sumOfEvenElements > sumOfOddElements
// }

// export function getSum(number: number): number {
//     if (number < 10){
//         return number
//     } else {
//         let res = 0, n;
//         while (number > 0) {
//             n = number % 10
//             res += n
//             number = ((number - n) / 10);
//         }
//         return res
//     }
// }

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export function sumFirstNumbers(N: number): number {
    //...здесь пишем код.
    let sum = 0;
    for (let i = 1; i <= N; i++) {
        sum += i;
    }
    return sum;
    // В return стоит "заглушка", чтоб typescript не ругался
    // return 0
    // return N * (N + 1) / 2
}

// ...и "лапку" вверх!!!!


// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено


export function getBanknoteList(amountOfMoney: number): Array<number> {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return [1]
}

// const getBirdsNumber = (num: number): string => {
//
// }
// console.log(getBirdsNumber(1)) => ('1 ворона')
// console.log(getBirdsNumber(2)) => ('2 ворон')