<?php

namespace App\Helpers;

use League\Csv\CharsetConverter;
use League\Csv\Reader;

class CsvHelper
{
    public static function readCsv($csvString): array
    {
        $csv = Reader::createFromString($csvString);
        $csv->setEscape(''); // Shift_JISのダメ文字対応でエスケープ文字を空文字列にする

        $encoding = mb_detect_encoding($csvString, ['UTF-8', 'SJIS']);
        $encoder = (new CharsetConverter())->inputEncoding($encoding);
        $records = $encoder->convert($csv);

        return self::convertToArray($records);
    }

    private static function convertToArray($records): array
    {
        $ret = [];
        foreach ($records as $record) {
            $row = '';
            for ($i = 0; $i < count($record); $i++) {
                $row .= '"'.$record[$i].'"';

                if ($i !== count($record) - 1) {
                    $row .= ',';
                }
            }
            $ret[] = $row;
        }

        return $ret;
    }
}
