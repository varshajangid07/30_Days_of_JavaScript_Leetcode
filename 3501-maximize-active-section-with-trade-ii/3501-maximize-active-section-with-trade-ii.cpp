class Solution {
public:
    vector<int> maxActiveSectionsAfterTrade(string s, vector<vector<int>>& queries) {
        int n = s.size(), ones = count(s.begin(), s.end(), '1');
        vector<int> st, ed, len;
        for (int i = 0; i < n; i++) {
            if (s[i] == '0') {
                int j = i;
                while (j < n && s[j] == '0') j++;
                st.push_back(i); ed.push_back(j - 1); len.push_back(j - i);
                i = j - 1;
            }
        }        
        int k = st.size();
        vector<vector<int>> mxL(18, vector<int>(k)), mnO(18, vector<int>(k)), mxA(18, vector<int>(k));
        for(int i = 0; i < k; i++) {
            mxL[0][i] = len[i];
            if (i < k - 1) {
                mnO[0][i] = st[i+1] - ed[i] - 1;
                mxA[0][i] = len[i] + len[i+1];
            }
        }
        for(int j = 1; j < 18; j++) {
            for(int i = 0; i + (1 << j) <= k; i++) {
                mxL[j][i] = max(mxL[j-1][i], mxL[j-1][i + (1 << (j-1))]);
                if (i + (1 << j) < k) {
                    mnO[j][i] = min(mnO[j-1][i], mnO[j-1][i + (1 << (j-1))]);
                    mxA[j][i] = max(mxA[j-1][i], mxA[j-1][i + (1 << (j-1))]);
                }
            }
        }
        auto RMQ = [&](const auto& t, int l, int r, bool is_min) {
            if (l > r) return is_min ? (int)1e9 : 0;
            int j = 31 - __builtin_clz(r - l + 1);
            return is_min ? min(t[j][l], t[j][r - (1 << j) + 1]) : max(t[j][l], t[j][r - (1 << j) + 1]);
        };
        vector<int> ans;
        for(auto& q : queries) {
            int a = lower_bound(ed.begin(), ed.end(), q[0]) - ed.begin();
            int b = upper_bound(st.begin(), st.end(), q[1]) - st.begin() - 1;
            if (a >= b || a >= k || b < 0) { 
                ans.push_back(ones); 
                continue; 
            }
            int La = min(q[1], ed[a]) - max(q[0], st[a]) + 1;
            int Lb = min(q[1], ed[b]) - max(q[0], st[b]) + 1;            
            int max_L = max({La, Lb, RMQ(mxL, a + 1, b - 1, 0)});
            int max_A = (a + 1 == b) ? La + Lb : max({La + len[a+1], len[b-1] + Lb, RMQ(mxA, a + 1, b - 2, 0)});
            ans.push_back(ones + max(max_A, max_L - RMQ(mnO, a, b - 1, 1)));
        }
        return ans;
    }
};