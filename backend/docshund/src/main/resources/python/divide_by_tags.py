from bs4 import BeautifulSoup
import sys
import json

def process_html(html_doc):
    soup = BeautifulSoup(html_doc, 'html.parser')
    elements = soup.find_all(['p', 'ul', 'ol', 'h1', 'h2', 'h3', 'h4', 'code'])
    paragraphs = []
    pOrder = 1

    for element in elements:
        tag = element.name
        if tag == 'p':
            content = str(element)
        elif element.find_parent('p'):
            continue
        else:
            content = str(element)

        paragraphs.append({
            "pOrder": pOrder,
            "tag": tag,
            "content": content
        })
        pOrder += 1

    return paragraphs

if __name__ == "__main__":
    try:
        print("[Python] Script started", file=sys.stderr)

        # 🔥 JSON 파싱 제거 → HTML 그대로 받기
        html_content = sys.stdin.read().strip()

        print(f"[Python] Raw HTML input length: {len(html_content)}", file=sys.stderr)
        print(f"[Python] Raw HTML preview: {html_content[:100]}", file=sys.stderr)

        if not html_content:
            raise ValueError("No HTML content received from Java")

        # 🔥 HTML 데이터 그대로 처리
        parsed_data = process_html(html_content)

        print("[Python] Processing complete", file=sys.stderr)
        print(json.dumps(parsed_data, ensure_ascii=False))  # UTF-8 출력 보장
        sys.stdout.flush()

    except Exception as e:
        print(f"[Python] Error: {str(e)}", file=sys.stderr)
        sys.stderr.flush()
        sys.exit(1)
